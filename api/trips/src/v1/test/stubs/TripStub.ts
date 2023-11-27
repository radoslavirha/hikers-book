import { MongoPlainObject, MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { Trip } from '../../models';
import { TripMongo } from '../../mongo';

export const TripStubId = '654d2193990714d40d22a554';

const createdAt = new Date();
const updatedAt = new Date();

export const TripStubMongo: MongoPlainObject<TripMongo> = {
  _id: TripStubId,
  label: 'Trip',
  description: 'Trip description',
  createdAt: createdAt,
  updatedAt: updatedAt
};

// No matter what is sent to modelToMongoCreateObject(), this is returned with model defaults
export const TripStubMongoCreate: MongoPlainObjectCreate<TripMongo> = {
  label: 'Trip',
  description: 'Trip description'
};

// No matter what is sent to modelToMongoUpdateObject(), this is returned without model defaults
export const TripStubMongoUpdate: MongoPlainObjectUpdate<TripMongo> = {
  label: 'Trip',
  description: 'Trip description'
};

export const TripStub = CommonUtils.buildModel(Trip, {
  id: TripStubId,
  label: 'Trip',
  description: 'Trip description',
  createdAt: createdAt,
  updatedAt: updatedAt
});
