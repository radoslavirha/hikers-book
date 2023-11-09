import { AuthProviderEnum } from '../enums/AuthProviderEnum';
import { OAuth2ProviderEmailNotProvided } from './OAuth2ProviderEmailNotProvided';

describe('OAuth2ProviderEmailNotProvided', () => {
  it('Should be 400 and have message', () => {
    const error = new OAuth2ProviderEmailNotProvided(AuthProviderEnum.GITHUB);

    expect(error.status).toBe(400);
    expect(error.message).toBe(`Email address not provided by ${AuthProviderEnum.GITHUB}!`);
  });
});
