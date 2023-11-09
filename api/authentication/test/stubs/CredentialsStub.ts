import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { AuthProviderEnum } from '../../src/global/enums';
import { Credentials } from '../../src/global/models';
import { CredentialsMongo } from '../../src/global/mongo';
import { UserStub, UserStubId } from './UserStub';

export const CredentialsStubId = '654d2193990714d40d22a554';

const createdAt = new Date();
const updatedAt = new Date();

export const CredentialsStubMongo: CredentialsMongo = {
  _id: CredentialsStubId,
  provider: AuthProviderEnum.GITHUB,
  email: 'email@test.com',
  provider_id: '123456789',
  password: 'password',
  user_id: UserStubId,
  createdAt: createdAt,
  updatedAt: updatedAt
};

export const CredentialsStub = CommonUtils.buildModel(Credentials, {
  id: CredentialsStubId,
  provider: AuthProviderEnum.GITHUB,
  email: 'email@test.com',
  provider_id: '123456789',
  password: 'password',
  user_id: UserStubId,
  user: undefined,
  createdAt: createdAt,
  updatedAt: updatedAt
});

export const CredentialsStubPopulated = CommonUtils.buildModel(Credentials, {
  ...CredentialsStub,
  user: UserStub
});
