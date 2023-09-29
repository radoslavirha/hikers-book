import { Inject, Service } from '@tsed/common';
import { Injectable } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Comment } from '../models/Comment';

@Injectable()
@Service()
export class CommentService {
  @Inject(Comment)
  private Comment!: MongooseModel<Comment>;

  async findByTrip(trip: string): Promise<Comment[]> {
    return this.Comment.find({ trip }).exec();
  }
}
