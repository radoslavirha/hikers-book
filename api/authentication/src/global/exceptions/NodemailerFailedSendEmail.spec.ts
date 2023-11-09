import { NodemailerFailedSendEmail } from './NodemailerFailedSendEmail';

describe('NodemailerFailedSendEmail', () => {
  it('Should be 400 and have message', () => {
    const error = new NodemailerFailedSendEmail('user@email.com');

    expect(error.status).toBe(400);
    expect(error.message).toBe(`Failed to send email to: user@email.com!`);
  });
});
