import { VerificationEmailExpired } from './VerificationEmailExpired';

describe('VerificationEmailExpired', () => {
  it('Should be 403 and have message', () => {
    const error = new VerificationEmailExpired();

    expect(error.status).toBe(403);
    expect(error.message).toBe(`Verification email expired!`);
  });
});
