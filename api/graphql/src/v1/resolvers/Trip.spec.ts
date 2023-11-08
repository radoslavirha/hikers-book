import { TestMongooseContext } from '@tsed/testing-mongoose';
import { TypeGraphQLService } from '@tsed/typegraphql';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { Server } from '../../Server';
import { TripNotFoundError } from '../errors/TripNotFoundError';
// import { Comment } from '../models/Comment';
import { Trip } from '../models/Trip';
import { TripService } from '../services/Trip';

const GET_TRIP = gql`
  query Trip($id: String!) {
    Trip(id: $id) {
      label
    }
  }
`;

const GET_TRIPS = gql`
  {
    Trips {
      label
    }
  }
`;

// const CREATE_TRIP = gql`
//   mutation CreateTrip($data: AddTripInput!) {
//     CreateTrip(data: $data) {
//       label
//     }
//   }
// `;

// const ADD_COMMENT_TO_TRIP = gql`
//   mutation AddCommentToTrip($id: String!, $data: AddCommentInput!) {
//     AddCommentToTrip(id: $id, data: $data) {
//       content
//     }
//   }
// `;

describe('Trip', () => {
  let request: ApolloServerTestClient;
  let service: TripService;
  // let spyAddComment: jest.SpyInstance;

  beforeAll(TestMongooseContext.bootstrap(Server));
  beforeAll(() => {
    const server = TestMongooseContext.get<TypeGraphQLService>(TypeGraphQLService).get('v1')!;
    service = TestMongooseContext.get(TripService);

    // @ts-expect-error apollo-server-testing types are wrong
    request = createTestClient(server);
    // spyAddComment = jest.spyOn(service, 'addComment').mockResolvedValue({ content: 'comment' });
  });
  afterAll(TestMongooseContext.reset);

  it('Should get trip', async () => {
    const spy = jest.spyOn(service, 'findById').mockResolvedValue({ label: 'trip' } as Trip);

    const response = await request.query({
      query: GET_TRIP,
      variables: { id: '64f1e2813c860fa45e7a54d7' }
    });

    expect(response.data).toEqual({ Trip: { label: 'trip' } });
    expect(spy).toBeCalledWith('64f1e2813c860fa45e7a54d7');
  });

  it('Should throw error', async () => {
    const id = '64f1e2813c860fa45e7a54d7';
    jest.spyOn(service, 'findById').mockResolvedValue(null);

    const response = await request.query({
      query: GET_TRIP,
      variables: { id }
    });

    expect(response.data).toEqual(null);
    expect(response.errors?.length).toEqual(1);
    expect(response.errors![0].message).toEqual(new TripNotFoundError(id).message);
  });

  it('Should get trips', async () => {
    const spy = jest.spyOn(service, 'find').mockResolvedValue([]);

    const response = await request.query({
      query: GET_TRIPS,
      variables: {}
    });

    expect(response.data).toEqual({ Trips: [] });
    expect(spy).toBeCalled();
  });

  // it('Should create trip', async () => {
  //   const spy = jest.spyOn(service, 'create').mockResolvedValue({ label: 'trip' } as Trip);
  //   const trip = {
  //     label: 'trip',
  //     description: 'description'
  //   };

  //   const response = await request.query({
  //     query: CREATE_TRIP,
  //     variables: {
  //       data: trip
  //     }
  //   });
  //   // @ts-expect-error tss
  //   console.log(response.errors[0]);

  //   expect(response.data).toEqual({ CreateTrip: { label: 'trip' } });
  //   expect(spy).toBeCalledWith(trip);
  // });

  // it('Should add comment', async () => {
  //   const spy = jest.spyOn(service, 'addComment').mockResolvedValue({ content: 'comment' } as Comment);
  //   const comment = {
  //       content: 'comment'
  //     },
  //     id = '64f1e2813c860fa45e7a54d7';

  //   const response = await request.query({
  //     query: ADD_COMMENT_TO_TRIP,
  //     variables: {
  //       id,
  //       data: comment
  //     }
  //   });

  //   expect(response.data).toEqual({ AddCommentToTrip: { content: 'comment' } });
  //   expect(spy).toBeCalledWith(id, comment);
  // });
});
