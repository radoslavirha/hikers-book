/* tslint:disable */
/* eslint-disable */
import { APIAuthenticationAuthGenericError } from '../models/api-authentication-auth-generic-error';
export interface APIAuthenticationAuthCredentialsAlreadyExist {

  /**
   * A list of related errors
   */
  errors?: Array<APIAuthenticationAuthGenericError>;

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
