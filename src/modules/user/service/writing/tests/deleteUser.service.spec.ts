import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../repository/user.repository';
import { PrismaService } from '../../../../../prisma.service';
import { createUserMockReturn } from './mocks/createUser.mock';
import { DeleteUserService } from '../deleteUser.service';
import { faker } from '@faker-js/faker';

describe('deleteUserService', () => {
  let service: DeleteUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: UserRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(createUserMockReturn),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('delete user:', () => {
    it('confirmation delete user', async () => {
      const result = await service.execute({
        user_id: faker.datatype.uuid(),
      });
      expect(result).toEqual(true);
    });

    it('error: user does not exist', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValueOnce(null);
      try {
        await service.execute({
          user_id: faker.datatype.uuid(),
        });
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(404);
        expect(error.message).toEqual('error: user does not exist!');
      }
    });

    it('error: database persistence error, contact admin!', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValueOnce(undefined);
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
