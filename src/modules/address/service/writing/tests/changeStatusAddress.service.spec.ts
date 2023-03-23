import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepository } from '../../../repository/address.repository';
import { PrismaService } from '../../../../../prisma.service';
import { UserRepository } from '../../../../user/repository/user.repository';
import { findUserMock } from '../../../../user/service/reading/tests/mocks/findUser.mock';
import { findAddressMock } from '../../reading/tests/mocks/findAddress.mock';
import { ChangeStatusAddressService } from '../changeStatusAddress.service';
import { changeStatusAddressMock } from './mocks/changeStatusAddress.mock';

describe('changeStatusAddressService', () => {
  let service: ChangeStatusAddressService;
  let repository: AddressRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangeStatusAddressService,
        {
          provide: AddressRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(findAddressMock),
            changeStatusAddress: jest.fn().mockResolvedValue(findAddressMock),
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

    service = module.get<ChangeStatusAddressService>(ChangeStatusAddressService);
    repository = module.get<AddressRepository>(AddressRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('change status address:', () => {
    it('confirmation change status address', async () => {
      const result = await service.execute(changeStatusAddressMock);
      expect(result).toEqual(findAddressMock);
    });

    it('error: address does not exist!', async () => {
      try {
        await service.execute(changeStatusAddressMock);
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(404);
        expect(error.message).toEqual('error: user does not exist!');
      }
    });

    it('error: database persistence error, contact admin!', async () => {
      jest.spyOn(repository, 'changeStatusAddress').mockResolvedValueOnce(null);
      try {
        await service.execute(changeStatusAddressMock);
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(500);
        expect(error.message).toEqual('error: database persistence error, contact admin!');
      }
    });
  });
});
