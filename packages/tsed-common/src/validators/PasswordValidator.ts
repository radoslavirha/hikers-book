import { ValidationError } from '@tsed/common';
import Validator from 'password-validator';

type PasswordValidatorError = {
  validation: string;
  arguments: string | number;
  message: string;
};

const normalizeErrors = (errors: PasswordValidatorError[]): string[] => {
  const normalized: string[] = [];

  for (const error of errors) {
    normalized.push(error.message);
  }

  return normalized;
};

export function PasswordValidator(data: { password: string }): { password: string } {
  const validator = new Validator();

  validator
    .is()
    .min(10)
    .is()
    .max(32)
    .has()
    .uppercase(1)
    .has()
    .lowercase(1)
    .has()
    .digits(1)
    .has()
    .symbols(1)
    .has()
    .not()
    .spaces(0);

  const errors = validator.validate(data.password, { details: true }) as PasswordValidatorError[];

  if (errors.length > 0) {
    throw new ValidationError('Password is not valid.', normalizeErrors(errors));
  }

  return data;
}
