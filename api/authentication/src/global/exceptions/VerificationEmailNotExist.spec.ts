import { VerificationEmailNotExist } from './VerificationEmailNotExist';

describe('VerificationEmailNotExist', () => {
  it('Should be 404 and have message', () => {
    const error = new VerificationEmailNotExist();

    expect(error.status).toBe(404);
    expect(error.message).toBe(`Verification email does not exist!`);
  });
});
