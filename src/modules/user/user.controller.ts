import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { DeleteUserParam } from './dto/deleteUser.dto';
import { FindUserParam } from './dto/findUser.dto';
import { UpdateUserDto, UpdateUserParam } from './dto/updateUser.dto';
import { FindUserService } from './service/reading/findUser.service';
import { CreateUserService } from './service/writing/createUser.service';
import { DeleteUserService } from './service/writing/deleteUser.service';
import { UpdateUserService } from './service/writing/updateUser.service';
import {
  ICreateUserService,
  IDeleteUserService,
  IFindUserService,
  IUpdateUser,
  IUpdateUserService,
} from './structure/IService.structure';

@Controller('v1/user')
export class UserController {
  constructor(
    @Inject(CreateUserService)
    private readonly createUserService: ICreateUserService,
    @Inject(FindUserService)
    private readonly findUserService: IFindUserService,
    @Inject(UpdateUserService)
    private readonly updateUserService: IUpdateUserService,
    @Inject(DeleteUserService)
    private readonly deleteUserService: IDeleteUserService,
  ) {}

  @Post('/create')
  async createUser(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }

  @Get('/find-user/:user_id')
  async findUser(@Param() param: FindUserParam) {
    return this.findUserService.execute({ user_id: param.user_id });
  }

  @Put('/update-user/:user_id')
  async updateUser(@Param() param: UpdateUserParam, @Body() data: UpdateUserDto) {
    const body: IUpdateUser = { body: data, user: { user_id: param.user_id } };
    return this.updateUserService.execute(body);
  }

  @Delete('/delete-user/:user_id')
  async DeleteUserService(@Param() param: DeleteUserParam) {
    return this.deleteUserService.execute({ user_id: param.user_id });
  }
}
