import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { Inject, Service } from '@tsed/di';
import { Forbidden, UnprocessableEntity } from '@tsed/exceptions';
import { Profile as FacebookProfile } from 'passport-facebook';
import { Profile as GithubProfile } from 'passport-github2';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { AuthProviderEnum } from '../enums';
import { CredentialsAlreadyExist } from '../exceptions';
import { OAuth2ProviderEmailNotProvided } from '../exceptions/OAuth2ProviderEmailNotProvided';
import { Credentials, EmailSignInRequest, EmailSignUpRequest, User } from '../models';
import { CryptographyUtils } from '../utils/CryptographyUtils';
import { JWTService } from './JWTService';
import { CredentialsMongooseService } from './mongoose/CredentialsMongooseService';
import { EmailVerificationMongooseService } from './mongoose/EmailVerificationMongooseService';
import { UserMongooseService } from './mongoose/UserMongooseService';

type ProviderEmailPair = { provider: AuthProviderEnum.EMAIL; profile: EmailSignUpRequest };
type ProviderFacebookPair = { provider: AuthProviderEnum.FACEBOOK; profile: FacebookProfile };
type ProviderGithubPair = { provider: AuthProviderEnum.GITHUB; profile: GithubProfile };
type ProviderGooglePair = { provider: AuthProviderEnum.GOOGLE; profile: GoogleProfile };

type OAuth2ProviderPair = ProviderFacebookPair | ProviderGithubPair | ProviderGooglePair;
type AuthProviderPair = ProviderEmailPair | OAuth2ProviderPair;

export type JWTResponse = {
  jwt: string;
  refresh: string;
};

@Service()
export class ProtocolAuthService {
  @Inject(CredentialsMongooseService)
  private credentials!: CredentialsMongooseService;

  @Inject(UserMongooseService)
  private user!: UserMongooseService;

  @Inject(EmailVerificationMongooseService)
  private emailVerification!: EmailVerificationMongooseService;

  @Inject(JWTService)
  private jwtService!: JWTService;

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
    const credentials = await this.findCredentialsByEmail(profile.email);

    if (credentials.length === 0) {
      const credentials = await this.createCredentialsAndUser({ provider: AuthProviderEnum.EMAIL, profile });
      const invitation = await this.emailVerification.findByEmail(profile.email);
      await this.emailVerification.delete(invitation!.id);
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
      throw new Forbidden('Invalid email.');
    }

    if (!(await CryptographyUtils.argon2VerifyPassword(credentials.password as string, request.password))) {
      throw new Forbidden('Invalid password.');
    }

    return this.createJWT(credentials);
  }

  private async handleOAuth2(data: OAuth2ProviderPair): Promise<JWTResponse> {
    const { provider, profile } = data;

    const email = this.getOAuth2ProviderEmail({ provider, profile } as OAuth2ProviderPair);

    await this.checkVerificationEmail(email);

    const credentials = await this.findCredentialsByEmail(email);

    if (credentials.length === 0) {
      const credentials = await this.createCredentialsAndUser({ provider, profile } as OAuth2ProviderPair);
      return this.createJWT(credentials);
    } else if (credentials.length > 1) {
      this.handleMultipleCredentials();
    } else if (credentials[0].provider !== provider || credentials[0].provider_id !== profile.id) {
      this.handleExistingCredentials(credentials[0].email, credentials[0].provider);
    } else {
      return this.createJWT(credentials[0]);
    }
  }

  private async createJWT(credentials: Credentials): Promise<JWTResponse> {
    if (!credentials.user) {
      throw new UnprocessableEntity('Cannot generate JWT.');
    }

    const jwt = await this.jwtService.createJWT({
      id: credentials.id,
      name: credentials.user.full_name
    });

    const refresh = await this.jwtService.createJWT(
      {
        id: credentials.id,
        name: credentials.user.full_name
      },
      true
    );

    return {
      jwt,
      refresh
    };
  }

  private async findCredentialsByEmail(email: string): Promise<Credentials[]> {
    return this.credentials.findManyByEmail(email);
  }

  private async createCredentialsAndUser(data: AuthProviderPair): Promise<Credentials> {
    const { provider, profile } = data;

    let full_name: string;

    switch (provider) {
      case AuthProviderEnum.EMAIL:
        full_name = profile.full_name;
        break;
      case AuthProviderEnum.FACEBOOK:
      case AuthProviderEnum.GITHUB:
      case AuthProviderEnum.GOOGLE:
        full_name = profile.displayName;
        break;
      default:
        throw new UnprocessableEntity('Invalid provider.');
    }

    const user = await this.user.create(CommonUtils.buildModel(User, { id: 'asdasdasd', full_name, admin: false }));

    let credentials: Credentials;

    switch (provider) {
      case AuthProviderEnum.EMAIL:
        credentials = CommonUtils.buildModel(Credentials, {
          provider: AuthProviderEnum.EMAIL,
          email: profile.email,
          password: profile.password,
          user_id: user.id
        });
        break;
      case AuthProviderEnum.FACEBOOK:
      case AuthProviderEnum.GITHUB:
      case AuthProviderEnum.GOOGLE:
        credentials = CommonUtils.buildModel(Credentials, {
          provider,
          email: this.getOAuth2ProviderEmail({ provider, profile } as OAuth2ProviderPair),
          provider_id: profile.id,
          user_id: user.id
        });
        break;
      default:
        throw new UnprocessableEntity('Invalid provider.');
    }

    const created = await this.credentials.create(credentials);
    return (await this.credentials.findById(created.id)) as Credentials;
  }

  private getOAuth2ProviderEmail(data: OAuth2ProviderPair): string {
    const { provider, profile } = data;
    if (profile.emails && profile.emails[0].value) {
      return profile.emails[0].value;
    }

    throw new OAuth2ProviderEmailNotProvided(provider);
  }

  private async checkVerificationEmail(email: string): Promise<void> {
    const invitation = await this.emailVerification.findByEmail(email);

    if (invitation) {
      throw new Forbidden(`Email verification pending for ${email}!`);
    }
  }

  private handleMultipleCredentials(): never {
    throw new UnprocessableEntity('Multiple credentials found.');
  }

  private handleExistingCredentials(email: string, provider: AuthProviderEnum): never {
    throw new CredentialsAlreadyExist(email, provider);
  }
}
