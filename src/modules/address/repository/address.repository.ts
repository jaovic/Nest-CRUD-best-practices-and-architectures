import { Injectable } from '@nestjs/common';
import { address } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { IAddressRepository, ICreateAddressRepository } from '../structure/IRepository.structure';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: ICreateAddressRepository): Promise<address> {
    return this.prisma.address.create({ data });
  }
}
