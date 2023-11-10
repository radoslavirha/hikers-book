import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { User } from '../../global/models';
import { UserMongo } from '../../global/mongo';

export const UserStubId = '654d2193990714d40d22a554';

const createdAt = new Date();
const updatedAt = new Date();

export const UserStubMongo: UserMongo = {
  _id: UserStubId,
  full_name: 'John Doe',
  admin: false,
  createdAt: createdAt,
  updatedAt: updatedAt
};

export const UserStub = CommonUtils.buildModel(User, {
  id: UserStubId,
  full_name: 'John Doe',
  admin: false,
  createdAt: createdAt,
  updatedAt: updatedAt
});
