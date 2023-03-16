import { users } from '@prisma/client';

export interface ICreateUser {
  name: string;
  document: string;
  email: string;
}

export interface IFindUser {
  user_id: string;
}

export interface ICreateUserService {
  execute(data: ICreateUser): Promise<users>;
}
export interface IFindUserService {
  execute(data: IFindUser): Promise<users>;
}
