/* tslint:disable */
/* eslint-disable */
import { APITripsV1GenericError } from '../models/api-trips-v-1-generic-error';
export interface APITripsV1Unauthorized {

  /**
   * A list of related errors
   */
  errors?: Array<APITripsV1GenericError>;

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
