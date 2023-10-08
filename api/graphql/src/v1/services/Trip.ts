import { Inject, Service } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { AddCommentInput, Comment } from '../models/Comment';
import { AddTripInput, Trip } from '../models/Trip';

@Service()
export class TripService {
  @Inject(Trip)
  private Trip!: MongooseModel<Trip>;

  @Inject(Comment)
  private Comment!: MongooseModel<Comment>;

  async findById(id: string): Promise<Trip | null> {
    return this.Trip.findById(id).exec();
  }

  async find(): Promise<Trip[]> {
    return this.Trip.find().exec();
  }

  async create(trip: AddTripInput): Promise<Trip> {
    return this.Trip.create(trip);
  }

  async addComment(id: string, data: AddCommentInput): Promise<Comment> {
    return this.Trip.findById(id).then(async (trip) => {
      const comment = await this.Comment.create({ trip: id, ...data });

      trip?.comments?.push(comment._id);

      await trip?.save();

      return comment;
    });
  }
}
