import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { findUserParam } from './dto/findUser.dto';
import { FindUserService } from './service/reading/findUser.service';
import { CreateUserService } from './service/writing/createUser.service';
import { ICreateUserService, IFindUserService } from './structure/IService.structure';

@Controller('v1/user')
export class UserController {
  constructor(
    @Inject(CreateUserService)
    private readonly createUserService: ICreateUserService,
    @Inject(FindUserService)
    private readonly fndUserService: IFindUserService,
  ) {}

  @Post('/create')
  async createUser(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }
  @Get('/find-user/:user_id')
  async findUser(@Param() param: findUserParam) {
    return this.fndUserService.execute({ user_id: param.user_id });
  }
}
