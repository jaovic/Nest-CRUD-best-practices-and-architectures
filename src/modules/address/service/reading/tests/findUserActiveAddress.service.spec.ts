import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepository } from '../../../repository/address.repository';
import { PrismaService } from '../../../../../prisma.service';
import { findAddressMock } from './mocks/findAddress.mock';
import { FindUserActiveAddressService } from '../findUserActiveAddress.service';
import { UserRepository } from '../../../../user/repository/user.repository';
import { findUserMock } from '../../../../user/service/reading/tests/mocks/findUser.mock';

describe('findUserActiveAddressService', () => {
  let service: FindUserActiveAddressService;
  let repository: AddressRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserActiveAddressService,
        {
          provide: AddressRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(findAddressMock),
            findUserActiveAddress: jest.fn().mockResolvedValue(findAddressMock),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(findUserMock),
          },
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<FindUserActiveAddressService>(FindUserActiveAddressService);
    repository = module.get<AddressRepository>(AddressRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Find user active address:', () => {
    it('confirmation find user active address', async () => {
      const result = await service.execute({
        user_id: faker.datatype.uuid(),
      });
      expect(result).toEqual(findAddressMock);
    });

    it('error: address does not exist!', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValueOnce(null);
      try {
        await service.execute({
          user_id: faker.datatype.uuid(),
        });
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(404);
        expect(error.message).toEqual('error: address does not exist!');
      }
    });

    it('error: database persistence error, contact admin!', async () => {
      jest.spyOn(repository, 'findUserActiveAddress').mockResolvedValueOnce(null);
      try {
        await service.execute({
          user_id: faker.datatype.uuid(),
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
