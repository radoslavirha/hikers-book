import { UserAlreadyExist } from '@hikers-book/tsed-common/exceptions';
import { Injectable } from '@tsed/di';
import { sign } from 'jsonwebtoken';
import { SignUpLocalResponse, User } from '../../models';
import { UserService } from '../../services/User';

@Injectable()
export class SignUpHandler {
  constructor(private userService: UserService) {}

  async local(payload: User): Promise<SignUpLocalResponse> {
    const exist = await this.userService.findByEmail(payload.email);

    if (exist) {
      throw new UserAlreadyExist(payload.email);
    }

    const user = await this.userService.create(payload);

    const jwt = sign(
      {
        id: user._id,
        email: user.email
      },
      'secret',
      {
        expiresIn: '1h'
      }
    );

    const response: SignUpLocalResponse = {
      jwt
    };

    return response;
  }
}
