import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ChangeStatusAddressDto, ChangeStatusAddressParam } from './dto/changeStatusAddress.dto';
import { CreateAddressDto, CreateAddressParam } from './dto/createAddress.dto';
import { DeleteAddressParam } from './dto/deleteAddress.dto';
import { FindAddressParam } from './dto/findAddress.dto';
import { FindUserActiveAddressParam } from './dto/findUserActiveAddress.dto';
import { UpdateAddressDto, UpdateAddressParam } from './dto/updateAddress.dto';
import { FindAddressService } from './service/reading/findAddress.service';
import { FinUSerActivedAddressService } from './service/reading/findUserActiveAddress.service';
import { ChangeStatusAddressService } from './service/writing/changeStatusAddress.service';
import { CreateAddressService } from './service/writing/createAddress.service';
import { DeleteAddressService } from './service/writing/deleteAddress.service';
import { UpdateAddressService } from './service/writing/updateAddress.service';
import {
  IChangeStatusAddressService,
  ICreateAddressService,
  IDeleteAddressService,
  IFindAddressService,
  IFindUserActiveAddressService,
  IUpdateAddress,
  IUpdateAddressService,
} from './structure/IService.structure';

@Controller('v1/address')
export class AddressController {
  constructor(
    @Inject(CreateAddressService)
    private readonly createAddressService: ICreateAddressService,
    @Inject(FindAddressService)
    private readonly findAddressService: IFindAddressService,
    @Inject(FinUSerActivedAddressService)
    private readonly finUSerActivedAddressService: IFindUserActiveAddressService,
    @Inject(UpdateAddressService)
    private readonly updateAddressService: IUpdateAddressService,
    @Inject(ChangeStatusAddressService)
    private readonly ChangeStatusAddressService: IChangeStatusAddressService,
    @Inject(DeleteAddressService)
    private readonly deleteAddressService: IDeleteAddressService,
  ) {}

  @Post('/create/:user_id')
  async createAddress(@Param() param: CreateAddressParam, @Body() data: CreateAddressDto) {
    return this.createAddressService.execute({ user_id: param.user_id, ...data });
  }

  @Put('/update/:address_id')
  async updateAddress(@Param() param: UpdateAddressParam, @Body() data: UpdateAddressDto) {
    const body: IUpdateAddress = { body: data, address: { address_id: param.address_id } };
    return this.updateAddressService.execute(body);
  }

  @Put('/change-status/:address_id')
  async changeStatusAddress(@Param() param: ChangeStatusAddressParam, @Body() data: ChangeStatusAddressDto) {
    return this.ChangeStatusAddressService.execute({ address_id: param.address_id, is_active: data.is_active });
  }

  @Delete('/delete/:address_id')
  async deleteAddress(@Param() param: DeleteAddressParam) {
    return this.deleteAddressService.execute(param.address_id);
  }

  @Get('/find/:address_id')
  async findAddress(@Param() param: FindAddressParam) {
    return this.findAddressService.execute({ address_id: param.address_id });
  }

  @Get('/find/active/:user_id')
  async findUserActiveAddress(@Param() param: FindUserActiveAddressParam) {
    return this.finUSerActivedAddressService.execute({ user_id: param.user_id });
  }
}
