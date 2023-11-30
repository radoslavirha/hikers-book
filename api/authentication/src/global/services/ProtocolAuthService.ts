import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { Service } from '@tsed/di';
import { Forbidden, UnprocessableEntity } from '@tsed/exceptions';
import { Profile as FacebookProfile } from 'passport-facebook';
import { Profile as GithubProfile } from 'passport-github2';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { AuthProviderEnum } from '../enums';
import { CredentialsAlreadyExist } from '../exceptions';
import { CredentialsMapper } from '../mappers/CredentialsMapper';
import { Credentials, EmailSignInRequest, EmailSignUpRequest, User } from '../models';
import { JWTResponse } from '../models/auth/email/JWTResponse';
import { AuthProviderPair, OAuth2ProviderPair } from '../types';
import { CryptographyUtils } from '../utils/CryptographyUtils';
import { JWTService } from './JWTService';
import { CredentialsMongoService } from './mongo/CredentialsMongoService';
import { EmailVerificationMongoService } from './mongo/EmailVerificationMongoService';
import { UserMongoService } from './mongo/UserMongoService';

@Service()
export class ProtocolAuthService {
  // eslint-disable-next-line max-params
  constructor(
    private credentials: CredentialsMongoService,
    private credentialsMapper: CredentialsMapper,
    private emailVerification: EmailVerificationMongoService,
    private jwtService: JWTService,
    private user: UserMongoService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async facebook(profile: FacebookProfile, accessToken: string, refreshToken: string): Promise<JWTResponse> {
    return this.handleOAuth2({ provider: AuthProviderEnum.FACEBOOK, profile });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async github(profile: GithubProfile, accessToken: string, refreshToken: string): Promise<JWTResponse> {
    return this.handleOAuth2({ provider: AuthProviderEnum.GITHUB, profile });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async google(profile: GoogleProfile, accessToken: string, refreshToken: string): Promise<JWTResponse> {
    return this.handleOAuth2({ provider: AuthProviderEnum.GOOGLE, profile });
  }

  public async emailSignUp(profile: EmailSignUpRequest): Promise<JWTResponse> {
    const credentials = await this.credentials.findManyByEmail(profile.email);

    if (credentials.length === 0) {
      const credentials = await this.createCredentialsAndUser({ provider: AuthProviderEnum.EMAIL, profile });
      await this.emailVerification.deleteByEmail(profile.email);
      return this.createJWT(credentials);
    } else if (credentials.length > 1) {
      this.handleMultipleCredentials();
    } else if (credentials[0].provider !== AuthProviderEnum.EMAIL) {
      this.handleExistingCredentials(credentials[0].email, credentials[0].provider);
    } else {
      return this.createJWT(credentials[0]);
    }
  }

  public async emailSignIn(request: EmailSignInRequest): Promise<JWTResponse> {
    const credentials = await this.credentials.findByEmailAndProvider(request.email, AuthProviderEnum.EMAIL);

    if (!credentials) {
      throw new Forbidden('Account does not exist!');
    }

    if (!(await CryptographyUtils.argon2VerifyPassword(credentials.password as string, request.password))) {
      throw new Forbidden('Invalid password!');
    }

    return this.createJWT(credentials);
  }

  private async handleOAuth2(data: OAuth2ProviderPair): Promise<JWTResponse> {
    const { provider, profile } = data;

    const email = this.getEmailFromOAuth2Profile(data);

    await this.checkVerificationEmail(email);

    const credentials = await this.credentials.findManyByEmail(email);

    if (credentials.length === 0) {
      const credentials = await this.createCredentialsAndUser(data);
      return this.createJWT(credentials);
    } else if (credentials.length > 1) {
      this.handleMultipleCredentials();
    } else if (credentials[0].provider !== provider || credentials[0].provider_id !== profile.id) {
      this.handleExistingCredentials(credentials[0].email, credentials[0].provider);
    } else {
      return this.createJWT(credentials[0]);
    }
  }

  private async createCredentialsAndUser(data: AuthProviderPair): Promise<Credentials> {
    const full_name = this.getUserNameFromProfile(data);

    const user = await this.user.create(CommonUtils.buildModel(User, { full_name, admin: false }));

    const credentials = this.credentialsMapper.modelFromAuthProfile(data, user.id, this.getEmailFromAuthProfile(data));

    const created = await this.credentials.create(credentials);

    return (await this.credentials.findById(created.id)) as Credentials;
  }

  private async createJWT(credentials: Credentials): Promise<JWTResponse> {
    if (!credentials.user) {
      throw new UnprocessableEntity('Cannot generate JWT.');
    }

    const jwt = await this.jwtService.createJWT({
      id: credentials.user.id,
      name: credentials.user.full_name
    });

    const refresh = await this.jwtService.createJWT(
      {
        id: credentials.user.id,
        name: credentials.user.full_name
      },
      true
    );

    return CommonUtils.buildModel(JWTResponse, {
      jwt,
      refresh
    });
  }

  private getEmailFromAuthProfile(data: AuthProviderPair): string {
    const { provider, profile } = data;

    switch (provider) {
      case AuthProviderEnum.EMAIL:
        return profile.email;
      case AuthProviderEnum.FACEBOOK:
      case AuthProviderEnum.GITHUB:
      case AuthProviderEnum.GOOGLE:
        return this.getEmailFromOAuth2Profile({ provider, profile } as OAuth2ProviderPair);
      default:
        throw new UnprocessableEntity(`Cannot get email from ${provider} profile.`);
    }
  }

  private getEmailFromOAuth2Profile(data: OAuth2ProviderPair): string {
    const { provider, profile } = data;
    if (profile.emails && profile.emails[0].value) {
      return profile.emails[0].value;
    }

    throw new UnprocessableEntity(`Cannot get email from ${provider} profile.`);
  }

  private getUserNameFromProfile(data: AuthProviderPair): string {
    const { provider, profile } = data;

    switch (provider) {
      case AuthProviderEnum.EMAIL:
        return profile.full_name;
      case AuthProviderEnum.FACEBOOK:
      case AuthProviderEnum.GITHUB:
      case AuthProviderEnum.GOOGLE:
        return profile.displayName;
      default:
        throw new UnprocessableEntity(`Cannot get username from ${provider} profile.`);
    }
  }

  private async checkVerificationEmail(email: string): Promise<void> {
    const invitation = await this.emailVerification.findByEmail(email);

    if (invitation) {
      throw new Forbidden(`Email verification pending for ${email}!`);
    }
  }

  private handleMultipleCredentials(): never {
    throw new UnprocessableEntity('Multiple credentials found!');
  }

  private handleExistingCredentials(email: string, provider: AuthProviderEnum): never {
    throw new CredentialsAlreadyExist(email, provider);
  }
}
