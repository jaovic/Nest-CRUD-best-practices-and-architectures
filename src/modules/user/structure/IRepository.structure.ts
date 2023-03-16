import { users } from '@prisma/client';

export interface ICreateUserRepository {
  name: string;
  document: string;
  email: string;
}

export interface IUserRepository {
  exists(where: Partial<users> | any, select?: object): Promise<users | null | Partial<users>>;
  create(data: ICreateUserRepository): Promise<users>;
  findById(id: string): Promise<users>;
}
