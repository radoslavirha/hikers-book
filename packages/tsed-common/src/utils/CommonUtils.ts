import JWT from 'jsonwebtoken';
import { JWTPayloadDecoded } from '../types';

export class CommonUtils {
  public static buildModel<T extends object>(type: { new (): T }, data: Partial<T>): T {
    const instance = new type();
    return Object.assign(instance, data) as T;
  }

  /**
   * Decode a bearer token and return the payload.
   * WARNING: This method does not verify the token!
   * @param bearer
   */
  public static decodeJWT(jwt: string): JWTPayloadDecoded {
    // eslint-disable-next-line import/no-named-as-default-member
    return JWT.decode(jwt) as JWTPayloadDecoded;
  }
}
