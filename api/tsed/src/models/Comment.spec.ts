import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { Comment } from './Comment';

describe('Comment model', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('Should save', async () => {
    const model = PlatformTest.get<MongooseModel<Comment>>(Comment);

    const comment = new model({ content: 'comment' });

    await comment.save();

    expect(comment.content).toEqual('comment');
  });
});
