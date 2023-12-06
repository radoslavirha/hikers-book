import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { Profile as FacebookProfile } from 'passport-facebook';
import { Profile as GithubProfile } from 'passport-github2';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { EmailSignUpRequest, RefreshToken, TokensPair } from '../../models';
import { UserStubId } from './UserStub';

export const ProfileFacebookStub: FacebookProfile = {
  id: 'id',
  displayName: 'Tester',
  birthday: '',
  provider: 'facebook',
  _json: {},
  _raw: '',
  emails: [{ value: 'tester@domain.com' }]
};

export const ProfileGithubStub: GithubProfile = {
  id: '123456789',
  displayName: 'Tester',
  provider: 'github',
  profileUrl: '',
  emails: [{ value: 'tester@domain.com' }]
};

export const ProfileGoogleStub: GoogleProfile = {
  id: 'id',
  displayName: 'Tester',
  provider: 'google',
  profileUrl: '',
  _json: { iss: '', aud: '', sub: '', iat: 1, exp: 1 },
  _raw: '',
  emails: [{ value: 'tester@domain.com', verified: 'true' }]
};

export const ProfileEmailStub: EmailSignUpRequest = {
  email: 'tester@domain.com',
  token: 'token',
  password: '8^^3286UhpB$9m',
  password_confirm: '8^^3286UhpB$9m',
  full_name: 'Tester'
};

export const TokensStub: TokensPair = CommonUtils.buildModel(TokensPair, {
  access: 'access',
  refresh: 'refresh'
});

export const RefreshTokenStub: RefreshToken = CommonUtils.buildModel(RefreshToken, {
  id: '654d2193990714d40d22a554',
  token_jti: 'jti',
  user_id: UserStubId,
  user: undefined,
  issuedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
});
