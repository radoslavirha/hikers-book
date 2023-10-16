import Argon2, { argon2id } from 'argon2';

import { argon2CreateHash, argon2VerifyPassword } from './argon2';

describe('lib/argon2.ts', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('argon2CreateHash + argon2VerifyPassword', () => {
    it('Should create hash and validate', async () => {
      const password = 'd71534f1-c806-45a2-87a5-8d8a3f1e7581';

      const hashSpy = jest.spyOn(Argon2, 'hash');
      const verifySpy = jest.spyOn(Argon2, 'verify');

      const hash = await argon2CreateHash(password);

      const valid = await argon2VerifyPassword(hash, password);

      expect(valid).toEqual(true);
      expect(hashSpy).toHaveBeenCalledWith(password, {
        type: argon2id,
        timeCost: 3,
        memoryCost: 64000,
        parallelism: 1,
        saltLength: 32,
        salt: expect.anything()
      });
      expect(verifySpy).toHaveBeenCalledWith(hash, password, {
        type: argon2id,
        timeCost: 3,
        memoryCost: 64000,
        parallelism: 1
      });
    });

    it('Should fail', async () => {
      const password = '8d8a3f1e7581-d71534f1-c806-45a2-87a5';

      const hash = await argon2CreateHash(password);
      const valid = await argon2VerifyPassword(hash, `${password}a`);

      expect(valid).toEqual(false);
    });
  });
});