import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './repository/user.repository';
import { CreateUserService } from './service/writing/createUser.service';
import { UserController } from './user.controller';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserService, UserRepository, PrismaService],
})
export class UserModule {}
