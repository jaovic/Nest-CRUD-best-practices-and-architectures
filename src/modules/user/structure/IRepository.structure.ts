import { users } from '@prisma/client';

export interface ICreateUserRepository {
  name: string;
  document: string;
  email: string;
}

export interface IUpdateUserRepository {
  user: { user_id: string };
  body: Partial<users>;
}

export interface IUserRepository {
  exists(where: Partial<users> | any, select?: object): Promise<users | null | Partial<users> | null>;
  create(data: ICreateUserRepository): Promise<users>;
  findById(id: string): Promise<users>;
  update(data: IUpdateUserRepository): Promise<users>;
  delete(id: string): Promise<boolean>;
}
