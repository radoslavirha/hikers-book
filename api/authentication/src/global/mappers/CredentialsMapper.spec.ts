import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { CredentialsStub, CredentialsStubMongo, CredentialsStubPopulated, UserStubMongo } from '../../test/stubs';
import { Credentials } from '../models/Credentials';
import { CredentialsMongo } from '../mongo/CredentialsMongo';
import { UserMongo } from '../mongo/UserMongo';
import { CredentialsMapper } from './CredentialsMapper';

describe('CredentialsMapper', () => {
  let mapper: CredentialsMapper;

  beforeEach(PlatformTest.create);
  beforeEach(async () => {
    mapper = await PlatformTest.invoke(CredentialsMapper);
  });
  afterEach(PlatformTest.reset);

  describe('mongoToModel', () => {
    it('Should return model', async () => {
      const MongoModel = PlatformTest.get<MongooseModel<CredentialsMongo>>(CredentialsMongo);
      const mongo = new MongoModel(CredentialsStubMongo);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(Credentials);
      expect(model).toEqual(CredentialsStub);
    });

    it('Should return populated model', async () => {
      const MongoModel = PlatformTest.get<MongooseModel<CredentialsMongo>>(CredentialsMongo);
      const MongoUserModel = PlatformTest.get<MongooseModel<UserMongo>>(UserMongo);
      const mongo = new MongoModel(CredentialsStubMongo);
      mongo.user_id = new MongoUserModel(UserStubMongo);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(Credentials);
      expect(model).toEqual(CredentialsStubPopulated);
    });
  });
});
