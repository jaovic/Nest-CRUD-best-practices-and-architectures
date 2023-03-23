import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../repository/user.repository';
import { PrismaService } from '../../../../../prisma.service';
import { CreateUserService } from '../createUser.service';
import { createUserMock, createUserMockReturn } from './mocks/createUser.mock';

describe('createUserService', () => {
  let service: CreateUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(createUserMockReturn),
            create: jest.fn().mockResolvedValue(createUserMockReturn),
          },
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create user:', () => {
    it('confirmation create user', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValueOnce(null);
      const result = await service.execute(createUserMock);
      expect(result).toEqual(createUserMockReturn);
    });

    it('error: user already exist', async () => {
      try {
        await service.execute(createUserMock);
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(403);
        expect(error.message).toEqual('error: user already exist!');
      }
    });

    it('error: database persistence error, contact admin!', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'create').mockResolvedValueOnce(undefined);
      try {
        await service.execute(createUserMock);
      } catch (error) {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('httpStatusCode');
        expect(error.httpStatusCode).toEqual(403);
        expect(error.message).toEqual('error: database persistence error, contact admin!');
      }
    });
  });
});
