import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import {
  ICreateUserRepository,
  IUpdateUserRepository,
  IUserRepository,
} from '../structure/IRepository.structure';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async exists(where: Partial<users>, select?: object): Promise<users | Partial<users>> {
    return this.prisma.users.findFirst({
      where,
      select,
    });
  }

  async findById(id: string): Promise<users> {
    return this.prisma.users.findFirst({ where: { id } });
  }

  async create(data: ICreateUserRepository): Promise<users> {
    return this.prisma.users.create({ data });
  }

  async update(data: IUpdateUserRepository): Promise<users> {
    return this.prisma.users.update({
      where: {
        id: data.user.user_id,
      },
      data: {
        ...data.body,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.users.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
