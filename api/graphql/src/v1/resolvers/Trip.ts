import { Inject } from '@tsed/di';
import { ResolverController } from '@tsed/typegraphql';
import { Arg, Mutation, Query } from 'type-graphql';
import { TripNotFoundError } from '../errors/TripNotFoundError';
// import { AddCommentInput, Comment } from '../models/Comment';
import { AddTripInput, Trip } from '../models/Trip';
import { TripService } from '../services/Trip';

@ResolverController()
export class TripResolver {
  @Inject()
  private tripService!: TripService;

  @Query(() => Trip, { description: 'Get trip by id' })
  async Trip(@Arg('id', { description: 'MongoDB _id' }) id: string) {
    const trip = await this.tripService.findById(id);

    if (!trip) {
      throw new TripNotFoundError(id);
    }

    return trip;
  }

  @Query(() => [Trip], { description: 'Get all the trips' })
  async Trips() {
    return this.tripService.find();
  }

  @Mutation(() => Trip, { description: 'Create a new trip' })
  async CreateTrip(@Arg('data') data: AddTripInput) {
    return this.tripService.create(data);
  }

  // @Mutation(() => Comment, { description: 'Add new comment to trip' })
  // async AddCommentToTrip(@Arg('id', { description: 'MongoDB _id' }) id: string, @Arg('data') event: AddCommentInput) {
  //   return this.tripService.addComment(id, event);
  // }
}
