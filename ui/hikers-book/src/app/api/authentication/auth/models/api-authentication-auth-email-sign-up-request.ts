/* tslint:disable */
/* eslint-disable */
export interface APIAuthenticationAuthEmailSignUpRequest {

  /**
   * Email used for registration.
   */
  email: string;

  /**
   * User's full name.
   */
  full_name: string;

  /**
   * User's password.
   */
  password: string;

  /**
   * Confirm password.
   */
  password_confirm: string;

  /**
   * Verification token sent to email.
   */
  token: string;
}
