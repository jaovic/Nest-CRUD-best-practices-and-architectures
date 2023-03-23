import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../repository/user.repository';
import { PrismaService } from '../../../../../prisma.service';
import { FindUserService } from '../findUser.service';
import { findUserMock } from './mocks/findUser.mock';

describe('findUserService', () => {
  let service: FindUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserService,
        {
          provide: UserRepository,
          useValue: {
            exists: jest.fn().mockResolvedValue(true),
            findById: jest.fn().mockResolvedValue(findUserMock),
          },
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<FindUserService>(FindUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('find user:', () => {
    it('confirmation find user', async () => {
      const result = await service.execute({
        user_id: faker.datatype.uuid(),
      });
      expect(result).toEqual(findUserMock);
    });

    it('error: user doest not exist', async () => {
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
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(undefined);
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
