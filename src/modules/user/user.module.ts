import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './repository/user.repository';
import { FindUserService } from './service/reading/findUser.service';
import { CreateUserService } from './service/writing/createUser.service';
import { UpdateUserService } from './service/writing/updateUser.service';
import { UserController } from './user.controller';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserService, UserRepository, PrismaService, FindUserService, UpdateUserService],
})
export class UserModule {}
