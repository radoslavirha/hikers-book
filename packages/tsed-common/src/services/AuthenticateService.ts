import { Configuration, Service } from '@tsed/di';
import axios from 'axios';
import { JWTAuthenticationResponse } from '../models';

@Service()
export class AuthenticateService {
  @Configuration()
  private settings!: Configuration;

  public async authenticate(token: string): Promise<JWTAuthenticationResponse> {
    const response = await axios.get<JWTAuthenticationResponse>(
      `${ this.settings?.configFile?.apis?.hikersBook?.authenticationAPI }/auth/authenticate`,
      {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      }
    );

    return response.data;
  }
}
