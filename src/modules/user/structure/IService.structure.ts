import { users } from '@prisma/client';

export interface ICreateUser {
  name: string;
  document: string;
  email: string;
}
export interface ICreateUserService {
  execute(data: ICreateUser): Promise<users>;
}
