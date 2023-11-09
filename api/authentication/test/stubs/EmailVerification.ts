import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { EmailVerification } from '../../src/global/models';
import { EmailVerificationMongo } from '../../src/global/mongo';

export const EmailVerificationStubId = '654d2193990714d40d22a554';

const createdAt = new Date();
const updatedAt = new Date();
const expiresIn = new Date();

export const EmailVerificationStubMongo: EmailVerificationMongo = {
  _id: EmailVerificationStubId,
  email: 'email@test.com',
  token: '123456789',
  expires_in: expiresIn,
  createdAt: createdAt,
  updatedAt: updatedAt
};

export const EmailVerificationStub = CommonUtils.buildModel(EmailVerification, {
  id: EmailVerificationStubId,
  email: 'email@test.com',
  token: '123456789',
  expires_in: expiresIn,
  createdAt: createdAt,
  updatedAt: updatedAt
});
