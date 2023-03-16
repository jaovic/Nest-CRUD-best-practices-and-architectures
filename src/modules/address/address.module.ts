import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from '../user/repository/user.repository';
import { AddressController } from './address.controller';
import { AddressRepository } from './repository/address.repository';
import { CreateAddressService } from './service/writing/createAddress.service';

@Module({
  imports: [],
  controllers: [AddressController],
  providers: [CreateAddressService, AddressRepository, UserRepository, PrismaService],
})
export class AddressModule {}
