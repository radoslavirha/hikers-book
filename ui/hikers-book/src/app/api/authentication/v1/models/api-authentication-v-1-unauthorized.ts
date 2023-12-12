/* tslint:disable */
/* eslint-disable */
import { APIAuthenticationV1GenericError } from '../models/api-authentication-v-1-generic-error';
export interface APIAuthenticationV1Unauthorized {

  /**
   * A list of related errors
   */
  errors?: Array<APIAuthenticationV1GenericError>;

  /**
   * An error message
   */
  message: string;

  /**
   * The error name
   */
  name: string;

  /**
   * The stack trace (only in development mode)
   */
  stack?: string;

  /**
   * The status code of the exception
   */
  status: number;
}
