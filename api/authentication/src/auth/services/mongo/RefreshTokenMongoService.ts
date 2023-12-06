import { MongoService } from '@hikers-book/tsed-common/mongo';
import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { RefreshTokenMapper } from '../../mappers/RefreshTokenMapper';
import { RefreshToken } from '../../models';
import { RefreshTokenMongo } from '../../mongo/RefreshTokenMongo';

@Service()
export class RefreshTokenMongoService extends MongoService<RefreshTokenMongo, RefreshToken> {
  @Inject(RefreshTokenMongo)
  protected model!: MongooseModel<RefreshTokenMongo>;

  @Inject(RefreshTokenMapper)
  protected mapper!: RefreshTokenMapper;

  async delete(id: string): Promise<RefreshToken | null> {
    const mongo = await this.model.findByIdAndDelete(id);

    return this.mapSingle(mongo);
  }

  async deleteByJTI(token_jti: string): Promise<void> {
    await this.model.deleteOne({ token_jti });
    return;
  }

  async find(token_jti: string, user_id: string): Promise<RefreshToken | null> {
    const mongo = await this.model.findOne(<RefreshTokenMongo>{ token_jti, user_id }).populate('user_id');

    return this.mapSingle(mongo);
  }

  async create(model: RefreshToken): Promise<RefreshToken> {
    const mongo = await this.model.create(await this.getCreateObject(model));

    return this.mapSingle(mongo) as Promise<RefreshToken>;
  }
}
