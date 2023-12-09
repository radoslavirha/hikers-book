import { MongoPlainObject, MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { EmailVerification } from '../../models';
import { EmailVerificationMongo } from '../../mongo';

export const EmailVerificationStubId = '654d2193990714d40d22a554';

const createdAt = new Date('2023-12-09T21:08:36.576Z');
const updatedAt = new Date('2023-12-09T21:08:36.576Z');
const expiresIn = new Date('2023-12-09T21:08:36.576Z');

export const EmailVerificationStubMongo: MongoPlainObject<EmailVerificationMongo> = {
  _id: EmailVerificationStubId,
  email: 'email@test.com',
  token: '123456789',
  expires_in: expiresIn,
  createdAt: createdAt,
  updatedAt: updatedAt
};

// No matter what is sent to modelToMongoCreateObject(), this is returned with model defaults
export const EmailVerificationStubMongoCreate: MongoPlainObjectCreate<EmailVerificationMongo> = {
  email: 'email@test.com',
  token: '123456789',
  expires_in: expiresIn.toISOString() as unknown as Date
};

// No matter what is sent to modelToMongoUpdateObject(), this is returned without model defaults
export const EmailVerificationStubMongoUpdate: MongoPlainObjectUpdate<EmailVerificationMongo> = {
  email: 'email@test.com',
  token: '123456789',
  expires_in: expiresIn.toISOString() as unknown as Date
};

export const EmailVerificationStub = CommonUtils.buildModel(EmailVerification, {
  id: EmailVerificationStubId,
  email: 'email@test.com',
  token: '123456789',
  expires_in: expiresIn,
  createdAt: createdAt,
  updatedAt: updatedAt
});
