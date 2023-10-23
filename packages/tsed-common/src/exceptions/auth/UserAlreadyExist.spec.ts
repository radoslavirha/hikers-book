import { UserAlreadyExist } from './UserAlreadyExist';

describe('UserAlreadyExist', () => {
  it('Should be 409 and have message', () => {
    const error = new UserAlreadyExist('user@email.com');

    expect(error.status).toBe(409);
    expect(error.message).toBe('User with email user@email.com already exist!');
  });
});
