import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddressModule } from '../address/address.module';
import { UserRepository } from './repository/user.repository';
import { FindUserService } from './service/reading/findUser.service';
import { CreateUserService } from './service/writing/createUser.service';
import { DeleteUserService } from './service/writing/deleteUser.service';
import { UpdateUserService } from './service/writing/updateUser.service';
import { UserController } from './user.controller';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserService,
    UserRepository,
    PrismaService,
    FindUserService,
    UpdateUserService,
    DeleteUserService,
    AddressModule,
  ],
})
export class UserModule {}
