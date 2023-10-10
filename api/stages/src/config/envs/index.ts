import dotenv from 'dotenv';

export const envs = {
  ...process.env,
  // eslint-disable-next-line import/no-named-as-default-member
  ...dotenv.config().parsed
};

export const isProduction = process.env.NODE_ENV === 'production';
