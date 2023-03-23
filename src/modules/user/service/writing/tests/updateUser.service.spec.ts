import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../repository/user.repository';
import { PrismaService } from '../../../../../prisma.service';
import { createUserMock, createUserMockReturn } from './mocks/createUser.mock';
import { faker } from '@faker-js/faker';
import { UpdateUserService } from '../updateUser.service';
import { UpdateUserMock } from './mocks/updateUser.mock';

describe('updateUserService', () => {
  let service: UpdateUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: UserRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(createUserMockReturn),
            update: jest.fn().mockResolvedValue(createUserMockReturn),
          },
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('update user:', () => {
    it('confirmation update user', async () => {
      const result = await service.execute(UpdateUserMock);
      expect(result).toEqual(createUserMockReturn);
    });

    it('error: user does not exist', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValueOnce(null);
      try {
        await service.execute(UpdateUserMock);
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(404);
        expect(error.message).toEqual('error: user does not exist!');
      }
    });

    it('error: database persistence error, contact admin!', async () => {
      jest.spyOn(repository, 'update').mockResolvedValueOnce(undefined);
      try {
        await service.execute(UpdateUserMock);
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(500);
        expect(error.message).toEqual('error: database persistence error, contact admin!');
      }
    });
  });
});
