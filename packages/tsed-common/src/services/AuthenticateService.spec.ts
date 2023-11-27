import { Configuration, PlatformTest } from '@tsed/common';
import axios from 'axios';
import { JWTAuthenticationResponse } from '../models';
import { AuthenticateService } from './AuthenticateService';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('AuthenticateService', () => {
  let service: AuthenticateService;

  beforeEach(() => {
    return PlatformTest.create({ imports: [] });
  });
  beforeEach(async () => {
    const providers = [
      {
        token: Configuration,
        use: {
          configFile: {
            apis: {
              hikersBook: {
                authenticationAPI: 'http://localhost:3000'
              }
            }
          }
        }
      }
    ];
    service = await PlatformTest.invoke<AuthenticateService>(AuthenticateService, providers);
  });
  afterEach(PlatformTest.reset);

  describe('authenticate', () => {
    const JWTStub: JWTAuthenticationResponse = { id: '1234', name: 'tester' };

    it('Should call axios', async () => {
      const spy = axiosMock.get.mockImplementation(() => Promise.resolve({ data: JWTStub }));

      await service.authenticate('token');

      expect(spy).toHaveBeenCalledWith('http://localhost:3000/auth/authenticate', {
        headers: {
          Authorization: `Bearer token`
        }
      });
    });

    it('Should return JWT payload', async () => {
      axiosMock.get.mockImplementation(() => Promise.resolve({ data: JWTStub }));

      const response = await service.authenticate('token');

      expect(response).toStrictEqual(JWTStub);
    });
  });
});
