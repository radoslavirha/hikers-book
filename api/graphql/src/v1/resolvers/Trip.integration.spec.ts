import { BEARER_TOKEN } from '@hikers-book/tsed-common/stubs';
import { PlatformTest } from '@tsed/common';
import { TypeGraphQLService } from '@tsed/typegraphql';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { Server } from '../../Server';
import { TripsDataSource } from '../datasources';

const GET_TRIPS = gql`
  {
    Trips {
      label
    }
  }
`;

describe('Trip', () => {
  let request: ApolloServerTestClient;
  let datasource: TripsDataSource;

  beforeAll(PlatformTest.bootstrap(Server));
  beforeAll(async () => {
    const server = PlatformTest.get<TypeGraphQLService>(TypeGraphQLService).get('v1')!;
    datasource = await PlatformTest.invoke(TripsDataSource);

    // @ts-expect-error apollo-server-testing types are wrong
    server.context = () => ({ token: BEARER_TOKEN });

    // @ts-expect-error apollo-server-testing types are wrong
    request = createTestClient(server);
  });
  afterAll(PlatformTest.reset);

  xit('Should get trips', async () => {
    const spy = jest.spyOn(datasource, 'getTrips').mockResolvedValue([]);

    await request.query({
      query: GET_TRIPS,
      variables: {}
    });

    // expect(response.data).toEqual({ Trips: [] });
    expect(spy).toHaveBeenCalled();
  });
});
