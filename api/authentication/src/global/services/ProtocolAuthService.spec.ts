import { PlatformTest } from '@tsed/common';
import { Forbidden, UnprocessableEntity } from '@tsed/exceptions';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import {
  CredentialsStub,
  CredentialsStubPopulated,
  EmailVerificationStub,
  JWTStub,
  ProfileEmailStub,
  ProfileFacebookStub,
  ProfileGithubStub,
  ProfileGoogleStub,
  UserStub
} from '../../test/stubs';
import { AuthProviderEnum } from '../enums';
import { CredentialsAlreadyExist } from '../exceptions';
import { CredentialsMapper } from '../mappers/CredentialsMapper';
import { Credentials, EmailSignInRequest, EmailSignUpRequest, User } from '../models';
import { ProviderGithubPair } from '../types';
import { CryptographyUtils } from '../utils';
import { JWTService } from './JWTService';
import { ProtocolAuthService } from './ProtocolAuthService';
import { CredentialsMongooseService } from './mongoose/CredentialsMongooseService';
import { EmailVerificationMongooseService } from './mongoose/EmailVerificationMongooseService';
import { UserMongooseService } from './mongoose/UserMongooseService';

describe('ProtocolAuthService', () => {
  let service: ProtocolAuthService;
  let credentials: CredentialsMongooseService;
  let credentialsMapper: CredentialsMapper;
  let emailVerification: EmailVerificationMongooseService;
  let jwtService: JWTService;
  let user: UserMongooseService;

  beforeAll(TestAuthenticationApiContext.bootstrap());
  beforeAll(() => {
    service = PlatformTest.get<ProtocolAuthService>(ProtocolAuthService);
    credentials = PlatformTest.get<CredentialsMongooseService>(CredentialsMongooseService);
    credentialsMapper = PlatformTest.get<CredentialsMapper>(CredentialsMapper);
    emailVerification = PlatformTest.get<EmailVerificationMongooseService>(EmailVerificationMongooseService);
    jwtService = PlatformTest.get<JWTService>(JWTService);
    user = PlatformTest.get<UserMongooseService>(UserMongooseService);
  });
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(TestAuthenticationApiContext.reset);

  describe('facebook', () => {
    it('Should call handleOAuth2()', async () => {
      // @ts-expect-error private
      const spy = jest.spyOn(service, 'handleOAuth2').mockResolvedValue(null);

      expect.assertions(2);

      const result = await service.facebook(ProfileFacebookStub, 'accessToken', 'refreshToken');

      expect(result).toBeNull();
      expect(spy).toHaveBeenCalledWith({ provider: AuthProviderEnum.FACEBOOK, profile: ProfileFacebookStub });
    });
  });

  describe('github', () => {
    it('Should call handleOAuth2()', async () => {
      // @ts-expect-error private
      const spy = jest.spyOn(service, 'handleOAuth2').mockResolvedValue(null);

      expect.assertions(2);

      const result = await service.github(ProfileGithubStub, 'accessToken', 'refreshToken');

      expect(result).toBeNull();
      expect(spy).toHaveBeenCalledWith({ provider: AuthProviderEnum.GITHUB, profile: ProfileGithubStub });
    });
  });

  describe('google', () => {
    it('Should call handleOAuth2()', async () => {
      // @ts-expect-error private
      const spy = jest.spyOn(service, 'handleOAuth2').mockResolvedValue(null);

      expect.assertions(2);

      const result = await service.google(ProfileGoogleStub, 'accessToken', 'refreshToken');

      expect(result).toBeNull();
      expect(spy).toHaveBeenCalledWith({ provider: AuthProviderEnum.GOOGLE, profile: ProfileGoogleStub });
    });
  });

  describe('emailSignUp', () => {
    const data: EmailSignUpRequest = ProfileEmailStub;

    let createCredentialsAndUserSpy: jest.SpyInstance;
    let credentialsFindManyByEmailSpy: jest.SpyInstance;
    let createJWTSpy: jest.SpyInstance;
    let handleMultipleCredentialsSpy: jest.SpyInstance;
    let handleExistingCredentialsSpy: jest.SpyInstance;
    let emailVerificationDelete: jest.SpyInstance;

    beforeEach(() => {
      credentialsFindManyByEmailSpy = jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([]);
      emailVerificationDelete = jest.spyOn(emailVerification, 'deleteByEmail').mockImplementation();
      createCredentialsAndUserSpy = jest
        // @ts-expect-error private
        .spyOn(service, 'createCredentialsAndUser')
        // @ts-expect-error private
        .mockResolvedValue(CredentialsStubPopulated);
      // @ts-expect-error private
      handleMultipleCredentialsSpy = jest.spyOn(service, 'handleMultipleCredentials').mockImplementation();
      // @ts-expect-error private
      handleExistingCredentialsSpy = jest.spyOn(service, 'handleExistingCredentials').mockImplementation();
      // @ts-expect-error private
      createJWTSpy = jest.spyOn(service, 'createJWT').mockResolvedValue(JWTStub);
    });

    it('Should call credentials.findManyByEmail()', async () => {
      expect.assertions(1);

      await service.emailSignUp(data);

      expect(credentialsFindManyByEmailSpy).toHaveBeenCalledWith('tester@domain.com');
    });

    it('Should create credentials - call createCredentialsAndUser() and emailVerification.deleteByEmail() and createJWT()', async () => {
      expect.assertions(3);

      await service.emailSignUp(data);

      expect(createCredentialsAndUserSpy).toHaveBeenCalledWith({ profile: data, provider: AuthProviderEnum.EMAIL });
      expect(emailVerificationDelete).toHaveBeenCalledWith('tester@domain.com');
      expect(createJWTSpy).toHaveBeenCalledWith(CredentialsStubPopulated);
    });

    it('Should create credentials - return JWT', async () => {
      expect.assertions(1);

      const jwt = await service.emailSignUp(data);

      expect(jwt).toStrictEqual(JWTStub);
    });

    it('Should call handleMultipleCredentials()', async () => {
      jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([CredentialsStub, CredentialsStub]);

      expect.assertions(1);

      await service.emailSignUp(data);

      expect(handleMultipleCredentialsSpy).toHaveBeenCalled();
    });

    it('Should call handleExistingCredentialsSpy() - provider mismatch', async () => {
      jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([
        <Credentials>{
          ...CredentialsStub,
          provider: AuthProviderEnum.GOOGLE
        }
      ]);

      expect.assertions(1);

      await service.emailSignUp(data);

      expect(handleExistingCredentialsSpy).toHaveBeenCalled();
    });

    it('Should authenticate - call createJWT()', async () => {
      jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([
        <Credentials>{
          ...CredentialsStub,
          provider: AuthProviderEnum.EMAIL
        }
      ]);

      expect.assertions(1);

      await service.emailSignUp(data);

      expect(createJWTSpy).toHaveBeenCalledWith(<Credentials>{
        ...CredentialsStub,
        provider: AuthProviderEnum.EMAIL
      });
    });

    it('Should authenticate - return JWT', async () => {
      jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([
        <Credentials>{
          ...CredentialsStub,
          provider: AuthProviderEnum.EMAIL
        }
      ]);

      expect.assertions(1);

      const jwt = await service.emailSignUp(data);

      expect(jwt).toStrictEqual(JWTStub);
    });
  });

  describe('emailSignIn', () => {
    const request: EmailSignInRequest = {
      email: 'tester@domain.com',
      password: '8^^3286UhpB$9m'
    };

    let credentialsFindByEmailAndProviderSpy: jest.SpyInstance;
    let cryptoSpy: jest.SpyInstance;
    let jwtSpy: jest.SpyInstance;

    beforeEach(() => {
      credentialsFindByEmailAndProviderSpy = jest
        .spyOn(credentials, 'findByEmailAndProvider')
        .mockResolvedValue(CredentialsStubPopulated);
      cryptoSpy = jest.spyOn(CryptographyUtils, 'argon2VerifyPassword').mockResolvedValue(true);
      // @ts-expect-error private
      jwtSpy = jest.spyOn(service, 'createJWT').mockResolvedValue(JWTStub);
    });

    it('Should call credentials.findByEmailAndProvider()', async () => {
      expect.assertions(1);

      await service.emailSignIn(request);

      expect(credentialsFindByEmailAndProviderSpy).toHaveBeenCalledWith(request.email, AuthProviderEnum.EMAIL);
    });

    it('Should call CryptographyUtils.argon2VerifyPassword()', async () => {
      expect.assertions(1);

      await service.emailSignIn(request);

      expect(cryptoSpy).toHaveBeenCalledWith(CredentialsStubPopulated.password, request.password);
    });

    it('Should call createJWT()', async () => {
      expect.assertions(1);

      await service.emailSignIn(request);

      expect(jwtSpy).toHaveBeenCalledWith(CredentialsStubPopulated);
    });

    it('Should return 403 - account does not exist', async () => {
      jest.spyOn(credentials, 'findByEmailAndProvider').mockResolvedValue(null);

      expect.assertions(3);

      try {
        await service.emailSignIn(request);
      } catch (error) {
        expect(error).toBeInstanceOf(Forbidden);
        expect((error as Forbidden).status).toBe(403);
        expect((error as Forbidden).message).toEqual('Account does not exist!');
      }
    });

    it('Should return 403 - invalid password', async () => {
      jest.spyOn(CryptographyUtils, 'argon2VerifyPassword').mockResolvedValue(false);

      expect.assertions(3);

      try {
        await service.emailSignIn(request);
      } catch (error) {
        expect(error).toBeInstanceOf(Forbidden);
        expect((error as Forbidden).status).toBe(403);
        expect((error as Forbidden).message).toEqual('Invalid password!');
      }
    });

    it('Should return jwt and refresh', async () => {
      expect.assertions(1);

      const response = await service.emailSignIn(request);

      expect(response).toEqual(JWTStub);
    });
  });

  describe('handleOAuth2', () => {
    const data: ProviderGithubPair = { provider: AuthProviderEnum.GITHUB, profile: ProfileGithubStub };

    let checkVerificationEmailSpy: jest.SpyInstance;
    let createCredentialsAndUserSpy: jest.SpyInstance;
    let createJWTSpy: jest.SpyInstance;
    let credentialsFindManyByEmailSpy: jest.SpyInstance;
    let getEmailSpy: jest.SpyInstance;
    let handleExistingCredentialsSpy: jest.SpyInstance;
    let handleMultipleCredentialsSpy: jest.SpyInstance;

    beforeEach(() => {
      // @ts-expect-error private
      checkVerificationEmailSpy = jest.spyOn(service, 'checkVerificationEmail').mockImplementation();
      createCredentialsAndUserSpy = jest
        // @ts-expect-error private
        .spyOn(service, 'createCredentialsAndUser')
        // @ts-expect-error private
        .mockResolvedValue(CredentialsStubPopulated);
      // @ts-expect-error private
      createJWTSpy = jest.spyOn(service, 'createJWT').mockResolvedValue(JWTStub);
      credentialsFindManyByEmailSpy = jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([]);
      // @ts-expect-error private
      getEmailSpy = jest.spyOn(service, 'getEmailFromOAuth2Profile').mockReturnValue('tester@domain.com');
      // @ts-expect-error private
      handleExistingCredentialsSpy = jest.spyOn(service, 'handleExistingCredentials').mockImplementation();
      // @ts-expect-error private
      handleMultipleCredentialsSpy = jest.spyOn(service, 'handleMultipleCredentials').mockImplementation();
    });

    it('Should call getEmailFromOAuth2Profile()', async () => {
      expect.assertions(1);

      // @ts-expect-error private
      await service.handleOAuth2(data);

      expect(getEmailSpy).toHaveBeenCalledWith(data);
    });

    it('Should call checkVerificationEmail()', async () => {
      expect.assertions(1);

      // @ts-expect-error private
      await service.handleOAuth2(data);

      expect(checkVerificationEmailSpy).toHaveBeenCalledWith('tester@domain.com');
    });

    it('Should call credentials.findManyByEmail()', async () => {
      expect.assertions(1);

      // @ts-expect-error private
      await service.handleOAuth2(data);

      expect(credentialsFindManyByEmailSpy).toHaveBeenCalledWith('tester@domain.com');
    });

    it('Should create credentials - call createCredentialsAndUser() and createJWT()', async () => {
      expect.assertions(2);

      // @ts-expect-error private
      await service.handleOAuth2(data);

      expect(createCredentialsAndUserSpy).toHaveBeenCalledWith(data);
      expect(createJWTSpy).toHaveBeenCalledWith(CredentialsStubPopulated);
    });

    it('Should create credentials - return JWT', async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const jwt = await service.handleOAuth2(data);

      expect(jwt).toStrictEqual(JWTStub);
    });

    it('Should call handleMultipleCredentials()', async () => {
      jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([CredentialsStub, CredentialsStub]);

      expect.assertions(1);

      // @ts-expect-error private
      await service.handleOAuth2(data);

      expect(handleMultipleCredentialsSpy).toHaveBeenCalled();
    });

    it('Should call handleExistingCredentialsSpy() - provider mismatch', async () => {
      jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([
        <Credentials>{
          ...CredentialsStub,
          provider: AuthProviderEnum.GOOGLE
        }
      ]);

      expect.assertions(1);

      // @ts-expect-error private
      await service.handleOAuth2(data);

      expect(handleExistingCredentialsSpy).toHaveBeenCalled();
    });

    it('Should call handleExistingCredentialsSpy() - provider_id mismatch', async () => {
      jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([
        <Credentials>{
          ...CredentialsStub,
          provider_id: 'random'
        }
      ]);

      expect.assertions(1);

      // @ts-expect-error private
      await service.handleOAuth2(data);

      expect(handleExistingCredentialsSpy).toHaveBeenCalled();
    });

    it('Should authenticate - call createJWT()', async () => {
      jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([CredentialsStub]);

      expect.assertions(1);

      // @ts-expect-error private
      await service.handleOAuth2(data);

      expect(createJWTSpy).toHaveBeenCalledWith(CredentialsStub);
    });

    it('Should authenticate - return JWT', async () => {
      jest.spyOn(credentials, 'findManyByEmail').mockResolvedValue([CredentialsStub]);

      expect.assertions(1);

      // @ts-expect-error private
      const jwt = await service.handleOAuth2(data);

      expect(jwt).toStrictEqual(JWTStub);
    });
  });

  describe('createCredentialsAndUser', () => {
    const data: ProviderGithubPair = { provider: AuthProviderEnum.GITHUB, profile: ProfileGithubStub };

    let credentialsCreateSpy: jest.SpyInstance;
    let credentialsFindByIdSpy: jest.SpyInstance;
    let userCreateSpy: jest.SpyInstance;

    beforeEach(() => {
      credentialsCreateSpy = jest.spyOn(credentials, 'create').mockResolvedValue(CredentialsStub);
      credentialsFindByIdSpy = jest.spyOn(credentials, 'findById').mockResolvedValue(CredentialsStubPopulated);
      userCreateSpy = jest.spyOn(user, 'create').mockResolvedValue(UserStub);
    });

    it('Should call getUserNameFromProfile()', async () => {
      // @ts-expect-error private
      const spy = jest.spyOn(service, 'getUserNameFromProfile');

      expect.assertions(1);

      // @ts-expect-error private
      await service.createCredentialsAndUser(data);

      expect(spy).toHaveBeenCalledWith(data);
    });

    it('Should call user.create()', async () => {
      expect.assertions(1);

      // @ts-expect-error private
      await service.createCredentialsAndUser(data);

      expect(userCreateSpy).toHaveBeenCalledWith(
        expect.objectContaining(<User>{
          full_name: 'Tester',
          admin: false
        })
      );
    });

    it('Should call credentialsMapper.modelFromAuthProfile()', async () => {
      const spy = jest.spyOn(credentialsMapper, 'modelFromAuthProfile');

      expect.assertions(1);

      // @ts-expect-error private
      await service.createCredentialsAndUser(data);

      expect(spy).toHaveBeenCalledWith(data, UserStub.id, 'tester@domain.com');
    });

    it('Should call credentials.create()', async () => {
      jest.spyOn(credentialsMapper, 'modelFromAuthProfile').mockReturnValue(CredentialsStub);

      expect.assertions(1);

      // @ts-expect-error private
      await service.createCredentialsAndUser(data);

      expect(credentialsCreateSpy).toHaveBeenCalledWith(CredentialsStub);
    });

    it('Should call credentials.findById()', async () => {
      jest.spyOn(credentialsMapper, 'modelFromAuthProfile').mockReturnValue(CredentialsStub);

      expect.assertions(1);

      // @ts-expect-error private
      await service.createCredentialsAndUser(data);

      expect(credentialsFindByIdSpy).toHaveBeenCalledWith(UserStub.id);
    });
  });

  describe('createJWT', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(jwtService, 'createJWT').mockResolvedValueOnce('jwt').mockResolvedValueOnce('refresh');
    });

    it('Should call jwtService.createJWT()', async () => {
      expect.assertions(3);

      // @ts-expect-error private
      await service.createJWT(CredentialsStubPopulated);

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, {
        id: CredentialsStubPopulated.user_id,
        name: CredentialsStubPopulated.user!.full_name
      });
      expect(spy).toHaveBeenNthCalledWith(
        2,
        {
          id: CredentialsStubPopulated.user_id,
          name: CredentialsStubPopulated.user!.full_name
        },
        true
      );
    });

    it('Should return jwt', async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const jwt = await service.createJWT(CredentialsStubPopulated);

      expect(jwt).toStrictEqual({ jwt: 'jwt', refresh: 'refresh' });
    });

    it('Should throw 422', async () => {
      expect.assertions(3);

      try {
        // @ts-expect-error private
        await service.createJWT(CredentialsStub);
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntity);
        expect((error as UnprocessableEntity).status).toBe(422);
        expect((error as UnprocessableEntity).message).toEqual('Cannot generate JWT.');
      }
    });
  });

  describe('getEmailFromAuthProfile', () => {
    it(`Should return email from ${AuthProviderEnum.FACEBOOK} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const email = service.getEmailFromAuthProfile({
        profile: ProfileFacebookStub,
        provider: AuthProviderEnum.FACEBOOK
      });

      expect(email).toEqual('tester@domain.com');
    });

    it(`Should return email from ${AuthProviderEnum.GITHUB} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const email = service.getEmailFromAuthProfile({
        profile: ProfileGithubStub,
        provider: AuthProviderEnum.GITHUB
      });

      expect(email).toEqual('tester@domain.com');
    });

    it(`Should return email from ${AuthProviderEnum.GOOGLE} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const email = service.getEmailFromAuthProfile({
        profile: ProfileGoogleStub,
        provider: AuthProviderEnum.GOOGLE
      });

      expect(email).toEqual('tester@domain.com');
    });

    it(`Should return email from ${AuthProviderEnum.EMAIL} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const email = service.getEmailFromAuthProfile({
        profile: ProfileEmailStub,
        provider: AuthProviderEnum.EMAIL
      });

      expect(email).toEqual('tester@domain.com');
    });

    it('Should return 422', async () => {
      expect.assertions(2);

      try {
        // @ts-expect-error private
        service.getEmailFromAuthProfile({ profile: {} });
      } catch (error) {
        expect((error as UnprocessableEntity).status).toBe(422);
        expect((error as UnprocessableEntity).message).toEqual(`Cannot get email from undefined profile.`);
      }
    });
  });

  describe('getEmailFromOAuth2Profile', () => {
    it(`Should return email from ${AuthProviderEnum.FACEBOOK} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const email = service.getEmailFromOAuth2Profile({
        profile: ProfileFacebookStub,
        provider: AuthProviderEnum.FACEBOOK
      });

      expect(email).toEqual('tester@domain.com');
    });

    it(`Should return email from ${AuthProviderEnum.GITHUB} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const email = service.getEmailFromOAuth2Profile({
        profile: ProfileGithubStub,
        provider: AuthProviderEnum.GITHUB
      });

      expect(email).toEqual('tester@domain.com');
    });

    it(`Should return email from ${AuthProviderEnum.GOOGLE} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const email = service.getEmailFromOAuth2Profile({
        profile: ProfileGoogleStub,
        provider: AuthProviderEnum.GOOGLE
      });

      expect(email).toEqual('tester@domain.com');
    });

    it('Should return 422', async () => {
      expect.assertions(2);

      try {
        // @ts-expect-error private
        service.getEmailFromOAuth2Profile({ profile: {}, provider: AuthProviderEnum.GITHUB });
      } catch (error) {
        expect((error as UnprocessableEntity).status).toBe(422);
        expect((error as UnprocessableEntity).message).toEqual(
          `Cannot get email from ${AuthProviderEnum.GITHUB} profile.`
        );
      }
    });
  });

  describe('getUserNameFromProfile', () => {
    it(`Should return username from ${AuthProviderEnum.FACEBOOK} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const username = service.getUserNameFromProfile({
        profile: ProfileFacebookStub,
        provider: AuthProviderEnum.FACEBOOK
      });

      expect(username).toEqual('Tester');
    });

    it(`Should return username from ${AuthProviderEnum.GITHUB} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const username = service.getUserNameFromProfile({
        profile: ProfileGithubStub,
        provider: AuthProviderEnum.GITHUB
      });

      expect(username).toEqual('Tester');
    });

    it(`Should return username from ${AuthProviderEnum.GOOGLE} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const username = service.getUserNameFromProfile({
        profile: ProfileGoogleStub,
        provider: AuthProviderEnum.GOOGLE
      });

      expect(username).toEqual('Tester');
    });

    it(`Should return username from ${AuthProviderEnum.EMAIL} profile`, async () => {
      expect.assertions(1);

      // @ts-expect-error private
      const username = service.getUserNameFromProfile({
        profile: ProfileEmailStub,
        provider: AuthProviderEnum.EMAIL
      });

      expect(username).toEqual('Tester');
    });

    it(`Should return 422`, async () => {
      expect.assertions(3);

      try {
        // @ts-expect-error private
        service.getUserNameFromProfile({
          profile: ProfileGoogleStub
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntity);
        expect((error as UnprocessableEntity).status).toBe(422);
        expect((error as UnprocessableEntity).message).toEqual(`Cannot get username from undefined profile.`);
      }
    });
  });

  describe('checkVerificationEmail', () => {
    let emailVerificationFindSpy: jest.SpyInstance;

    beforeEach(() => {
      emailVerificationFindSpy = jest.spyOn(emailVerification, 'findByEmail').mockResolvedValue(null);
    });

    it('Should call emailVerification.findByEmail()', async () => {
      expect.assertions(1);

      // @ts-expect-error private
      await service.checkVerificationEmail('tester@domain.com');

      expect(emailVerificationFindSpy).toHaveBeenCalledWith('tester@domain.com');
    });

    it('Should pass', async () => {
      expect.assertions(0);

      try {
        // @ts-expect-error private
        await service.checkVerificationEmail('tester@domain.com');
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });

    it('Should return 403', async () => {
      jest.spyOn(emailVerification, 'findByEmail').mockResolvedValue(EmailVerificationStub);

      expect.assertions(2);

      try {
        // @ts-expect-error private
        await service.checkVerificationEmail('tester@domain.com');
      } catch (error) {
        expect((error as Forbidden).status).toBe(403);
        expect((error as Forbidden).message).toEqual('Email verification pending for tester@domain.com!');
      }
    });
  });

  describe('handleMultipleCredentials', () => {
    it('Should throw  422', async () => {
      expect.assertions(3);

      try {
        // @ts-expect-error private
        await service.handleMultipleCredentials();
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntity);
        expect((error as UnprocessableEntity).status).toBe(422);
        expect((error as UnprocessableEntity).message).toEqual('Multiple credentials found!');
      }
    });
  });

  describe('handleExistingCredentials', () => {
    it('Should throw 403', async () => {
      expect.assertions(3);

      try {
        // @ts-expect-error private
        await service.handleExistingCredentials('tester@domain.com', AuthProviderEnum.EMAIL);
      } catch (error) {
        expect(error).toBeInstanceOf(CredentialsAlreadyExist);
        expect((error as CredentialsAlreadyExist).status).toBe(403);
        expect((error as CredentialsAlreadyExist).message).toEqual(
          `User with email tester@domain.com is already registered with ${AuthProviderEnum.EMAIL}!`
        );
      }
    });
  });
});
