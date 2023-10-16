import { argon2id, hash, Options, verify } from 'argon2';
import { randomBytes } from 'crypto';

export const argon2CreateHash = async (password: string): Promise<string> => {
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
};

export const argon2VerifyPassword = async (hash: string, password: string): Promise<boolean> =>
  verify(hash, password, {
    type: argon2id,
    timeCost: 3,
    memoryCost: 64000,
    parallelism: 1
  });

export default {
  argon2CreateHash,
  argon2VerifyPassword
};
