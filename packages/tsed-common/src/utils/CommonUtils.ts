import { Type } from '@tsed/core';
import { deserialize } from '@tsed/json-mapper';
import { getJsonSchema } from '@tsed/schema';
import Ajv from 'ajv';
import JWT from 'jsonwebtoken';
import _ from 'lodash';
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

  public static validateModel<T>(model: Type<T>, input: unknown): T {
    const ajv = new Ajv({ allErrors: true });

    const schema = getJsonSchema(model);

    const validate = ajv.compile(schema);

    const valid = validate(deserialize<T>(input, { type: model }));

    if (!valid) {
      throw validate.errors;
    }

    return deserialize<T>(input, { type: model });
  }

  public static cloneDeep<T>(obj: T): T {
    return _.cloneDeep(obj);
  }
}
