import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepository } from '../../../repository/address.repository';
import { PrismaService } from '../../../../../prisma.service';
import { UserRepository } from '../../../../user/repository/user.repository';
import { findUserMock } from '../../../../user/service/reading/tests/mocks/findUser.mock';
import { findAddressMock } from '../../reading/tests/mocks/findAddress.mock';
import { UpdateAddressService } from '../updateAddress.service';
import { UpdateAddressMock } from './mocks/updateAddress.mock';

describe('updateAddressService', () => {
  let service: UpdateAddressService;
  let repository: AddressRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAddressService,
        {
          provide: AddressRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(findAddressMock),
            updateAddress: jest.fn().mockResolvedValue(findAddressMock),
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

    service = module.get<UpdateAddressService>(UpdateAddressService);
    repository = module.get<AddressRepository>(AddressRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('update address:', () => {
    it('confirmation update address', async () => {
      const result = await service.execute(UpdateAddressMock);
      expect(result).toEqual(findAddressMock);
    });

    it('error: address does not exist!', async () => {
      try {
        await service.execute(UpdateAddressMock);
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(404);
        expect(error.message).toEqual('error: user does not exist!');
      }
    });

    it('error: database persistence error, contact admin!', async () => {
      jest.spyOn(repository, 'updateAddress').mockResolvedValueOnce(null);
      try {
        await service.execute(UpdateAddressMock);
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(500);
        expect(error.message).toEqual('error: database persistence error, contact admin!');
      }
    });
  });
});
