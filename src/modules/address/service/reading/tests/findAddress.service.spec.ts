import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepository } from '../../../repository/address.repository';
import { PrismaService } from '../../../../../prisma.service';
import { FindAddressService } from '../findAddress.service';
import { findAddressMock } from './mocks/findAddress.mock';

describe('findAddressService', () => {
  let service: FindAddressService;
  let repository: AddressRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAddressService,
        {
          provide: AddressRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(findAddressMock),
            findAddress: jest.fn().mockResolvedValue(findAddressMock),
          },
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<FindAddressService>(FindAddressService);
    repository = module.get<AddressRepository>(AddressRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Find address:', () => {
    it('confirmation find address', async () => {
      const result = await service.execute({
        address_id: faker.datatype.uuid(),
      });
      expect(result).toEqual(findAddressMock);
    });

    it('error: address does not exist!', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValueOnce(null);
      try {
        await service.execute({
          address_id: faker.datatype.uuid(),
        });
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(404);
        expect(error.message).toEqual('error: address does not exist!');
      }
    });

    it('error: database persistence error, contact admin!', async () => {
      jest.spyOn(repository, 'findAddress').mockResolvedValueOnce(null);
      try {
        await service.execute({
          address_id: faker.datatype.uuid(),
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
