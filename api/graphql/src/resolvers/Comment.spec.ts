import { TestMongooseContext } from '@tsed/testing-mongoose';
import { TypeGraphQLService } from '@tsed/typegraphql';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { Server } from '../Server';
import { CommentService } from '../services/Comment';

const GET_TRIP_COMMENTS = gql`
  query TripComments($id: String!) {
    TripComments(id: $id) {
      content
    }
  }
`;

describe('Comment', () => {
  let request: ApolloServerTestClient;
  let spyFindByTrip: jest.SpyInstance;

  beforeAll(TestMongooseContext.bootstrap(Server));
  beforeAll(() => {
    const server = TestMongooseContext.get<TypeGraphQLService>(TypeGraphQLService).get('default')!;
    const service = TestMongooseContext.get(CommentService);

    // @ts-expect-error apollo-server-testing types are wrong
    request = createTestClient(server);
    spyFindByTrip = jest.spyOn(service, 'findByTrip').mockResolvedValue([]);
  });
  afterAll(TestMongooseContext.reset);

  it('Should get trip comments', async () => {
    const response = await request.query({
      query: GET_TRIP_COMMENTS,
      variables: { id: '64f1e2813c860fa45e7a54d7' }
    });

    expect(response.data).toEqual({ TripComments: [] });
    expect(spyFindByTrip).toBeCalledWith('64f1e2813c860fa45e7a54d7');
  });
});
