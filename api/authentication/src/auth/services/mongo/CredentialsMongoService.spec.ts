import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { AuthProviderEnum } from '../../enums';
import { Credentials } from '../../models';
import { CredentialsMongo } from '../../mongo';
import { CredentialsStub, CredentialsStubId, CredentialsStubMongoCreate } from '../../test/stubs';
import { CredentialsMongoService } from './CredentialsMongoService';

describe('CredentialsMongoService', () => {
  let service: CredentialsMongoService;
  let model: MongooseModel<CredentialsMongo>;

  beforeAll(TestAuthenticationApiContext.bootstrap());
  beforeEach(async () => {
    await TestAuthenticationApiContext.clearDatabase();
    model = PlatformTest.get<MongooseModel<CredentialsMongo>>(CredentialsMongo);
    service = PlatformTest.get<CredentialsMongoService>(CredentialsMongoService);
  });
  afterAll(TestAuthenticationApiContext.reset);

  describe('findById', () => {
    it('Should pass - data exist', async () => {
      const r = await service.create(CredentialsStub);
      const spy = jest.spyOn(model, 'findById');

      expect.assertions(2);

      const response = await service.findById(r.id);

      expect(response).toBeInstanceOf(Credentials);
      expect(spy).toHaveBeenCalledWith(r.id);
    });

    it('Should pass - data does not exist', async () => {
      expect.assertions(1);

      const response = await service.findById(CredentialsStubId);

      expect(response).toEqual(null);
    });
  });

  describe('findByEmail', () => {
    it('Should pass - data exist', async () => {
      const r = await service.create(CredentialsStub);
      const spy = jest.spyOn(model, 'findOne');

      expect.assertions(2);

      const response = await service.findByEmail(r.email);

      expect(response).toBeInstanceOf(Credentials);
      expect(spy).toHaveBeenCalledWith({ email: r.email });
    });

    it('Should pass - data does not exist', async () => {
      expect.assertions(1);

      const response = await service.findByEmail(CredentialsStubId);

      expect(response).toEqual(null);
    });
  });

  describe('findByEmailAndProvider', () => {
    it('Should pass - data exist', async () => {
      const r = await service.create(CredentialsStub);
      const spy = jest.spyOn(model, 'findOne');

      expect.assertions(2);

      const response = await service.findByEmailAndProvider(r.email, AuthProviderEnum.GITHUB);

      expect(response).toBeInstanceOf(Credentials);
      expect(spy).toHaveBeenCalledWith({ email: r.email, provider: AuthProviderEnum.GITHUB });
    });

    it('Should pass - data does not exist', async () => {
      expect.assertions(1);

      const response = await service.findByEmailAndProvider(CredentialsStubId, AuthProviderEnum.GITHUB);

      expect(response).toEqual(null);
    });
  });

  describe('findManyByEmail', () => {
    it('Should pass - data exist', async () => {
      const r = await service.create(CredentialsStub);
      const spy = jest.spyOn(model, 'find');

      expect.assertions(3);

      const response = await service.findManyByEmail(r.email);

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Credentials);
      expect(spy).toHaveBeenCalledWith({ email: r.email });
    });

    it('Should pass - data does not exist', async () => {
      expect.assertions(1);

      const response = await service.findManyByEmail(CredentialsStubId);

      expect(response).toEqual([]);
    });
  });

  describe('create', () => {
    it('Should pass', async () => {
      // @ts-expect-error protected
      const mapperSpy = jest.spyOn(service, 'getCreateObject').mockResolvedValue(CredentialsStubMongoCreate);
      const spy = jest.spyOn(model, 'create');

      expect.assertions(3);

      const response = await service.create(CredentialsStub);

      expect(response).toBeInstanceOf(Credentials);
      expect(spy).toHaveBeenCalledWith(CredentialsStubMongoCreate);
      expect(mapperSpy).toHaveBeenCalledWith(CredentialsStub);
    });
  });
});
