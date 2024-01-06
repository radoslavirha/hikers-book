import { AuthProviderEnum } from '../enums/AuthProviderEnum';
import { CredentialsAlreadyExist } from './CredentialsAlreadyExist';

describe('CredentialsAlreadyExist', () => {
  it('Should be 403 and have message', () => {
    const error = new CredentialsAlreadyExist('user@email.com', AuthProviderEnum.GITHUB);

    expect(error.status).toBe(403);
    expect(error.message)
      .toBe(`User with email user@email.com is already registered with ${ AuthProviderEnum.GITHUB }!`);
  });
});
