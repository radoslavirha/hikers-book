import { UserAlreadyExist } from '@hikers-book/tsed-common/exceptions';
import { Injectable } from '@tsed/di';
import { JWTService } from '../../../services';
import { SignUpLocalResponse, User } from '../../models';
import { UserService } from '../../services/User';

@Injectable()
export class SignUpHandler {
  constructor(
    private userService: UserService,
    private jwtService: JWTService
  ) {}

  async local(payload: User): Promise<SignUpLocalResponse> {
    const exist = await this.userService.findByEmail(payload.email);
    if (exist) {
      throw new UserAlreadyExist(payload.email);
    }

    const user = await this.userService.create(payload);

    const jwt = await this.jwtService.createJWT({
      id: user._id,
      email: user.email
    });

    const refresh = await this.jwtService.createJWT(
      {
        id: user._id,
        email: user.email
      },
      true
    );

    const response: SignUpLocalResponse = {
      jwt,
      refresh
    };

    return response;
  }
}
