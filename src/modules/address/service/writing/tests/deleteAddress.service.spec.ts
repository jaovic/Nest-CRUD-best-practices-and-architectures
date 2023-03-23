import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepository } from '../../../repository/address.repository';
import { PrismaService } from '../../../../../prisma.service';
import { createAddressMock } from './mocks/createAddress.mock';
import { DeleteAddressService } from '../deleteAddress.service';
import { faker } from '@faker-js/faker';

describe('deleteAddressService', () => {
  let service: DeleteAddressService;
  let repository: AddressRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteAddressService,
        {
          provide: AddressRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(createAddressMock),
            deleteAddress: jest.fn().mockResolvedValue(true),
          },
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<DeleteAddressService>(DeleteAddressService);
    repository = module.get<AddressRepository>(AddressRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('delete address:', () => {
    it('confirmation delete address', async () => {
      const result = await service.execute({
        id: faker.datatype.uuid(),
      });
      expect(result).toEqual(true);
    });

    it('error: user does not exist!', async () => {
      try {
        await service.execute({
          id: faker.datatype.uuid(),
        });
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(404);
        expect(error.message).toEqual('error: user does not exist!');
      }
    });

    it('error: database persistence error, contact admin!', async () => {
      jest.spyOn(repository, 'deleteAddress').mockResolvedValueOnce(null);
      try {
        await service.execute({
          id: faker.datatype.uuid(),
        });
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(500);
        expect(error.message).toEqual('error: database persistence error, contact admin!');
      }
    });
  });
});
