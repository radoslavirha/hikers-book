import { MongoPlainObject, MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { User } from '../../models';
import { UserMongo } from '../../mongo';

export const UserStubId = '654d2193990714d40d22a554';

const createdAt = new Date();
const updatedAt = new Date();

export const UserStubMongo: MongoPlainObject<UserMongo> = {
  _id: UserStubId,
  full_name: 'John Doe',
  admin: false,
  createdAt: createdAt,
  updatedAt: updatedAt
};

// No matter what is sent to modelToMongoCreateObject(), this is returned with model defaults
export const UserStubMongoCreate: MongoPlainObjectCreate<UserMongo> = {
  full_name: 'John Doe',
  admin: false
};

// No matter what is sent to modelToMongoUpdateObject(), this is returned without model defaults
export const UserStubMongoUpdate: MongoPlainObjectUpdate<UserMongo> = {
  full_name: 'John Doe',
  admin: false
};

export const UserStub = CommonUtils.buildModel(User, {
  id: UserStubId,
  full_name: 'John Doe',
  admin: false,
  createdAt: createdAt,
  updatedAt: updatedAt
});
