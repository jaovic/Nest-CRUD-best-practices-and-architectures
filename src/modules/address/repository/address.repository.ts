import { Injectable } from '@nestjs/common';
import { address } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import {
  IAddressRepository,
  IChangeStatusAddressRepository,
  ICreateAddressRepository,
  IUpdateAddressRepository,
} from '../structure/IRepository.structure';
import { IChangeStatusAddress } from '../structure/IService.structure';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(private prisma: PrismaService) {}
  finUserActivedAddress(id: string): Promise<address> {
    throw new Error('Method not implemented.');
  }

  async exists(where: Partial<address>, select?: object): Promise<address | Partial<address>> {
    return this.prisma.address.findFirst({
      where,
      select,
    });
  }

  async findAddress(id: string): Promise<address> {
    return this.prisma.address.findFirst({ where: { id } });
  }

  async finUserActiveAddress(id: string): Promise<address> {
    return this.prisma.address.findFirst({
      where: {
        user_id: id,
        is_active: true,
      },
    });
  }

  async updateAddress(data: IUpdateAddressRepository): Promise<address> {
    return this.prisma.address.update({
      where: {
        id: data.address.address_id,
      },
      data: {
        ...data.body,
      },
    });
  }

  async changeStatusAddress(data: IChangeStatusAddressRepository): Promise<address> {
    return this.prisma.address.update({
      where: {
        id: data.address_id,
      },
      data: {
        is_active: data.is_active,
      },
    });
  }

  async create(data: ICreateAddressRepository): Promise<address> {
    return this.prisma.address.create({ data });
  }
}
