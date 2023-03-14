import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserService } from './service/writing/createUser.service';
import { ICreateUserService } from './structure/IService.structure';

@Controller('v1/user')
export class UserController {
  constructor(
    @Inject(CreateUserService)
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post('/create')
  async createUser(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }
}
