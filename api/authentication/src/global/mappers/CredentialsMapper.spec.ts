import { PlatformTest } from '@tsed/common';
import { UnprocessableEntity } from '@tsed/exceptions';
import { MongooseModel } from '@tsed/mongoose';
import {
  CredentialsStub,
  CredentialsStubMongo,
  CredentialsStubMongoCreate,
  CredentialsStubMongoUpdate,
  CredentialsStubPopulated,
  ProfileEmailStub,
  ProfileFacebookStub,
  ProfileGithubStub,
  ProfileGoogleStub,
  UserStubMongo
} from '../../test/stubs';
import { AuthProviderEnum } from '../enums';
import { Credentials } from '../models/Credentials';
import { CredentialsMongo } from '../mongo/CredentialsMongo';
import { UserMongo } from '../mongo/UserMongo';
import { CredentialsMapper } from './CredentialsMapper';

describe('CredentialsMapper', () => {
  let mapper: CredentialsMapper;

  beforeEach(PlatformTest.create);
  beforeEach(async () => {
    mapper = await PlatformTest.invoke(CredentialsMapper);
  });
  afterEach(PlatformTest.reset);

  describe('mongoToModel', () => {
    it('Should return model', async () => {
      const MongoModel = PlatformTest.get<MongooseModel<CredentialsMongo>>(CredentialsMongo);
      const mongo = new MongoModel(CredentialsStubMongo);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(Credentials);
      expect(model).toEqual(CredentialsStub);
    });

    it('Should return populated model', async () => {
      const MongoModel = PlatformTest.get<MongooseModel<CredentialsMongo>>(CredentialsMongo);
      const MongoUserModel = PlatformTest.get<MongooseModel<UserMongo>>(UserMongo);
      const mongo = new MongoModel(CredentialsStubMongo);
      mongo.user_id = new MongoUserModel(UserStubMongo);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(Credentials);
      expect(model).toEqual(CredentialsStubPopulated);
    });
  });

  describe('modelToMongoCreateObject', () => {
    it('Should return model', async () => {
      const object = await mapper.modelToMongoCreateObject(CredentialsStub);

      expect(object).toBeInstanceOf(Object);
      expect(object).toStrictEqual(CredentialsStubMongoCreate);
    });
  });

  describe('modelToMongoUpdateObject', () => {
    it('Should return model', async () => {
      const object = await mapper.modelToMongoUpdateObject(CredentialsStub);

      expect(object).toBeInstanceOf(Object);
      expect(object).toStrictEqual(CredentialsStubMongoUpdate);
    });
  });

  describe('modelFromAuthProfile', () => {
    const userId = '654d2193990714d40d22a554';
    const email = 'tester@domain.com';

    it(`Should return credentials model from ${AuthProviderEnum.FACEBOOK} profile`, async () => {
      expect.assertions(2);

      const credentials = mapper.modelFromAuthProfile(
        {
          profile: ProfileFacebookStub,
          provider: AuthProviderEnum.FACEBOOK
        },
        userId,
        email
      );

      expect(credentials).toBeInstanceOf(Credentials);
      expect(credentials).toEqual(
        expect.objectContaining(<Credentials>{
          provider: AuthProviderEnum.FACEBOOK,
          email,
          provider_id: ProfileFacebookStub.id,
          user_id: userId
        })
      );
    });

    it(`Should return credentials model from ${AuthProviderEnum.GITHUB} profile`, async () => {
      expect.assertions(2);

      const credentials = mapper.modelFromAuthProfile(
        {
          profile: ProfileGithubStub,
          provider: AuthProviderEnum.GITHUB
        },
        userId,
        email
      );

      expect(credentials).toBeInstanceOf(Credentials);
      expect(credentials).toEqual(
        expect.objectContaining(<Credentials>{
          provider: AuthProviderEnum.GITHUB,
          email,
          provider_id: ProfileGithubStub.id,
          user_id: userId
        })
      );
    });

    it(`Should return credentials model from ${AuthProviderEnum.GOOGLE} profile`, async () => {
      expect.assertions(2);

      const credentials = mapper.modelFromAuthProfile(
        {
          profile: ProfileGoogleStub,
          provider: AuthProviderEnum.GOOGLE
        },
        userId,
        email
      );

      expect(credentials).toBeInstanceOf(Credentials);
      expect(credentials).toEqual(
        expect.objectContaining(<Credentials>{
          provider: AuthProviderEnum.GOOGLE,
          email,
          provider_id: ProfileGoogleStub.id,
          user_id: userId
        })
      );
    });

    it(`Should return credentials model from ${AuthProviderEnum.EMAIL} profile`, async () => {
      expect.assertions(2);

      const credentials = mapper.modelFromAuthProfile(
        {
          profile: ProfileEmailStub,
          provider: AuthProviderEnum.EMAIL
        },
        userId,
        email
      );

      expect(credentials).toBeInstanceOf(Credentials);
      expect(credentials).toEqual(
        expect.objectContaining(<Credentials>{
          provider: AuthProviderEnum.EMAIL,
          email,
          password: ProfileEmailStub.password,
          user_id: userId
        })
      );
    });

    it(`Should return 422`, async () => {
      expect.assertions(3);

      try {
        mapper.modelFromAuthProfile(
          // @ts-expect-error simulate error
          {
            profile: ProfileGoogleStub
          },
          userId,
          email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntity);
        expect((error as UnprocessableEntity).status).toBe(422);
        expect((error as UnprocessableEntity).message).toEqual('Cannot create credentials model from profile.');
      }
    });
  });
});
