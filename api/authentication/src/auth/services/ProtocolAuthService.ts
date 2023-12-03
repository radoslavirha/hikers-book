import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { Req } from '@tsed/common';
import { Service } from '@tsed/di';
import { ClientException, Forbidden, UnprocessableEntity } from '@tsed/exceptions';
import ms from 'ms';
import { Profile as FacebookProfile } from 'passport-facebook';
import { Profile as GithubProfile } from 'passport-github2';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { ConfigService } from '../../global/services/ConfigService';
import { AuthProviderEnum } from '../enums';
import { CredentialsAlreadyExist } from '../exceptions';
import { CredentialsMapper } from '../mappers/CredentialsMapper';
import { Cookies, Credentials, EmailSignInRequest, EmailSignUpRequest, Tokens, User } from '../models';
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
    private configService: ConfigService,
    private credentials: CredentialsMongoService,
    private credentialsMapper: CredentialsMapper,
    private emailVerification: EmailVerificationMongoService,
    private jwtService: JWTService,
    private user: UserMongoService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async facebook(profile: FacebookProfile, accessToken: string, refreshToken: string): Promise<Tokens> {
    return this.handleOAuth2({ provider: AuthProviderEnum.FACEBOOK, profile });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async github(profile: GithubProfile, accessToken: string, refreshToken: string): Promise<Tokens> {
    return this.handleOAuth2({ provider: AuthProviderEnum.GITHUB, profile });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async google(profile: GoogleProfile, accessToken: string, refreshToken: string): Promise<Tokens> {
    return this.handleOAuth2({ provider: AuthProviderEnum.GOOGLE, profile });
  }

  public async emailSignUp(profile: EmailSignUpRequest): Promise<Tokens> {
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

  public async emailSignIn(request: EmailSignInRequest): Promise<Tokens> {
    const credentials = await this.credentials.findByEmailAndProvider(request.email, AuthProviderEnum.EMAIL);

    if (!credentials) {
      throw new Forbidden('Account does not exist!');
    }

    if (!(await CryptographyUtils.argon2VerifyPassword(credentials.password as string, request.password))) {
      throw new Forbidden('Invalid password!');
    }

    return this.createJWT(credentials);
  }

  public redirectOAuth2Success(request: Req, tokens: Tokens): void {
    this.setRefreshCookie(request, tokens.refresh);
    return request.res?.redirect(`${this.configService.config.frontend.url}/auth/callback?access=${tokens.access}`);
  }

  public setRefreshCookie(request: Req, refresh: string): void {
    request.res?.cookie(Cookies.Refresh, refresh, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms(this.configService.config.jwt.expiresInRefresh)
    });
  }

  public redirectOAuth2Failure(request: Req, error: ClientException): void {
    return request.res?.redirect(
      `${this.configService.config.frontend.url}/auth/error?code=${(error as Forbidden).status}&message=${
        (error as Forbidden).message
      }`
    );
  }

  private async handleOAuth2(data: OAuth2ProviderPair): Promise<Tokens> {
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

  private async createJWT(credentials: Credentials): Promise<Tokens> {
    if (!credentials.user) {
      throw new UnprocessableEntity('Cannot generate JWT.');
    }

    const access = await this.jwtService.createAT({
      id: credentials.user.id,
      name: credentials.user.full_name
    });

    const refresh = await this.jwtService.createRT({
      id: credentials.user.id,
      name: credentials.user.full_name
    });

    return CommonUtils.buildModel(Tokens, {
      access,
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
