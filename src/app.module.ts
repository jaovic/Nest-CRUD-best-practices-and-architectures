import { Module } from '@nestjs/common';
import { AddressModule } from './modules/address/address.module';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, AddressModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
