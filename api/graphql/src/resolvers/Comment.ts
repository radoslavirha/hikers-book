import { Inject } from '@tsed/di';
import { ResolverController } from '@tsed/typegraphql';
import { Arg, Query } from 'type-graphql';
import { Comment } from '../models/Comment';
import { CommentService } from '../services/Comment';

@ResolverController()
export class CommentResolver {
  @Inject()
  private commentService!: CommentService;

  @Query(() => [Comment], { description: 'Get trip comments' })
  async TripComments(@Arg('id', { description: 'MongoDB trip _id' }) id: string) {
    return this.commentService.findByTrip(id);
  }
}
