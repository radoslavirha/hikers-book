import { VerificationEmailExist } from './VerificationEmailExist';

describe('VerificationEmailExist', () => {
  it('Should be 403 and have message', () => {
    const error = new VerificationEmailExist('user@email.com');

    expect(error.status).toBe(403);
    expect(error.message).toBe(`Verification email already sent to user@email.com!`);
  });
});
