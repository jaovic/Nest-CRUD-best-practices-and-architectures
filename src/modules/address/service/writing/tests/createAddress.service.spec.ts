import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepository } from '../../../repository/address.repository';
import { PrismaService } from '../../../../../prisma.service';
import { UserRepository } from '../../../../user/repository/user.repository';
import { findUserMock } from '../../../../user/service/reading/tests/mocks/findUser.mock';
import { CreateAddressService } from '../createAddress.service';
import { createAddressMock } from './mocks/createAddress.mock';
import { findAddressMock } from '../../reading/tests/mocks/findAddress.mock';

describe('createAddressService', () => {
  let service: CreateAddressService;
  let repository: AddressRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAddressService,
        {
          provide: AddressRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(createAddressMock),
            create: jest.fn().mockResolvedValue(findAddressMock),
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

    service = module.get<CreateAddressService>(CreateAddressService);
    repository = module.get<AddressRepository>(AddressRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create address:', () => {
    it('confirmation create address', async () => {
      const result = await service.execute(createAddressMock);
      expect(result).toEqual(findAddressMock);
    });

    it('error: user does not exist!', async () => {
      try {
        await service.execute(createAddressMock);
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(404);
        expect(error.message).toEqual('error: user does not exist!');
      }
    });

    it('error: database persistence error, contact admin!', async () => {
      jest.spyOn(repository, 'create').mockResolvedValueOnce(null);
      try {
        await service.execute(createAddressMock);
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(500);
        expect(error.message).toEqual('error: database persistence error, contact admin!');
      }
    });
  });
});
