import Argon2, { argon2id } from 'argon2';

import { CryptographyUtils } from './CryptographyUtils';

describe('CryptographyUtils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('argon2CreateHash + argon2VerifyPassword', () => {
    it('Should create hash and validate', async () => {
      const password = 'd71534f1-c806-45a2-87a5-8d8a3f1e7581';

      const hashSpy = jest.spyOn(Argon2, 'hash');
      const verifySpy = jest.spyOn(Argon2, 'verify');

      const hash = await CryptographyUtils.argon2CreateHash(password);

      const valid = await CryptographyUtils.argon2VerifyPassword(hash, password);

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

      const hash = await CryptographyUtils.argon2CreateHash(password);
      const valid = await CryptographyUtils.argon2VerifyPassword(hash, `${ password }a`);

      expect(valid).toEqual(false);
    });
  });

  describe('generateJWTjti', () => {
    it('Should return random string', async () => {
      const jti = await CryptographyUtils.generateJWTjti();

      expect(jti).toStrictEqual(expect.any(String));
      expect(jti.length).toBe(36);
    });
  });
});
