import { MongoPlainObject, MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { AuthProviderEnum } from '../../enums';
import { Credentials } from '../../models';
import { CredentialsMongo } from '../../mongo';
import { UserStub, UserStubId } from './UserStub';

export const CredentialsStubId = '654d2193990714d40d22a554';

const createdAt = new Date();
const updatedAt = new Date();

export const CredentialsStubMongo: MongoPlainObject<CredentialsMongo> = {
  _id: CredentialsStubId,
  provider: AuthProviderEnum.GITHUB,
  email: 'email@test.com',
  provider_id: '123456789',
  password: 'password',
  user_id: UserStubId,
  createdAt: createdAt,
  updatedAt: updatedAt
};

// No matter what is sent to modelToMongoCreateObject(), this is returned with model defaults
export const CredentialsStubMongoCreate: MongoPlainObjectCreate<CredentialsMongo> = {
  provider: AuthProviderEnum.GITHUB,
  email: 'email@test.com',
  provider_id: '123456789',
  password: 'password',
  user_id: UserStubId
};

// No matter what is sent to modelToMongoUpdateObject(), this is returned without model defaults
export const CredentialsStubMongoUpdate: MongoPlainObjectUpdate<CredentialsMongo> = {
  provider: AuthProviderEnum.GITHUB,
  email: 'email@test.com',
  provider_id: '123456789',
  password: 'password',
  user_id: UserStubId
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
