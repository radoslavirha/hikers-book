import { PlatformTest } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import { TypeGraphQLService } from '@tsed/typegraphql';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { Server } from './Server';
import { TestGraphQLApiContext } from './test/TestGraphQLApiContext';

const QUERY = gql`
  {
    Trips {
      label
    }
  }
`;

describe('Server - production', () => {
  process.env.NODE_ENV = 'production';
  let request: ApolloServerTestClient;

  beforeAll(TestGraphQLApiContext.bootstrap(Server));
  beforeAll(() => {
    const server = PlatformTest.get<TypeGraphQLService>(TypeGraphQLService).get('v1')!;
    // @ts-expect-error apollo-server-testing types are wrong
    request = createTestClient(server);
  });

  afterAll(PlatformTest.reset);

  it('Should check Authorization header', async () => {
    try {
      await request.query({
        query: QUERY,
        variables: {}
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Unauthorized);
      expect((error as Unauthorized).message).toBe('No authorization header present.');
    }
  });
});
