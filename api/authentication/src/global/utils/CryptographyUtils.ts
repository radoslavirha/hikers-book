import { argon2id, hash, Options, verify } from 'argon2';
import { randomBytes } from 'crypto';

export class CryptographyUtils {
  public static async argon2CreateHash(password: string): Promise<string> {
    const hashingConfig: Partial<Options & { raw?: false }> = {
      type: argon2id,
      timeCost: 3,
      memoryCost: 64000,
      parallelism: 1,
      saltLength: 32
    };

    const salt = randomBytes(hashingConfig.saltLength as number);

    return hash(password, {
      ...hashingConfig,
      salt
    });
  }

  public static async argon2VerifyPassword(hash: string, password: string): Promise<boolean> {
    return verify(hash, password, {
      type: argon2id,
      timeCost: 3,
      memoryCost: 64000,
      parallelism: 1
    });
  }

  public static generateJWTjti(): string {
    return randomBytes(Math.ceil((32 * 3) / 4))
      .toString('base64')
      .slice(0, 32)
      .replace(/[+/]/g, '0');
  }
}
