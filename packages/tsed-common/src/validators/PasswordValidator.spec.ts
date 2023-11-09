import { ValidationError } from '@tsed/common';
import { PasswordValidator } from './PasswordValidator';

describe('PasswordValidator', () => {
  it('Should pass', async () => {
    expect.assertions(0);

    try {
      PasswordValidator({ password: '123AbC**@d' });
    } catch (error) {
      expect(error).not.toBeDefined();
    }
  });

  it('Should fail - too short', async () => {
    expect.assertions(2);

    try {
      PasswordValidator({ password: '123AbC**@' });
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).message).toEqual('Password is not valid.');
    }
  });
});
