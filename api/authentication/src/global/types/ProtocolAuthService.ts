import { Profile as FacebookProfile } from 'passport-facebook';
import { Profile as GithubProfile } from 'passport-github2';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { AuthProviderEnum } from '../enums';
import { EmailSignUpRequest } from '../models';

export type ProviderEmailPair = { provider: AuthProviderEnum.EMAIL; profile: EmailSignUpRequest };
export type ProviderFacebookPair = { provider: AuthProviderEnum.FACEBOOK; profile: FacebookProfile };
export type ProviderGithubPair = { provider: AuthProviderEnum.GITHUB; profile: GithubProfile };
export type ProviderGooglePair = { provider: AuthProviderEnum.GOOGLE; profile: GoogleProfile };

export type OAuth2ProviderPair = ProviderFacebookPair | ProviderGithubPair | ProviderGooglePair;
export type AuthProviderPair = ProviderEmailPair | OAuth2ProviderPair;
