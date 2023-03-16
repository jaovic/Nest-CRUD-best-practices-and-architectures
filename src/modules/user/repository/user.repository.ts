import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ICreateUserRepository, IUserRepository } from '../structure/IRepository.structure';

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
}
