import { PlatformTest } from '@tsed/common';
import { TypeGraphQLService } from '@tsed/typegraphql';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { Server } from '../../Server';
import { TestGraphQLApiContext } from '../../test/TestGraphQLApiContext';

const getMock = jest.fn();

jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    get = getMock;
  }

  return {
    RESTDataSource: MockRESTDataSource
  };
});

const GET_TRIPS = gql`
  {
    Trips {
      label
    }
  }
`;

describe('Trip', () => {
  let request: ApolloServerTestClient;

  beforeAll(TestGraphQLApiContext.bootstrap(Server));
  beforeAll(async () => {
    const server = PlatformTest.get<TypeGraphQLService>(TypeGraphQLService).get('v1')!;
    // @ts-expect-error apollo-server-testing types are wrong
    request = createTestClient(server);
  });
  afterAll(PlatformTest.reset);

  it('Should get trips', async () => {
    await request.query({
      query: GET_TRIPS,
      variables: {}
    });

    expect(getMock).toHaveBeenCalled();
  });
});
