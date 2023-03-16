import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { CreateAddressDto, CreateAddressParam } from './dto/createAddress.dto';
import { CreateAddressService } from './service/writing/createAddress.service';
import { ICreateAddressService } from './structure/IService.structure';

@Controller('v1/address')
export class AddressController {
  constructor(
    @Inject(CreateAddressService)
    private readonly createAddressService: ICreateAddressService,
  ) {}

  @Post('/create/:user_id')
  async createAddress(@Param() param: CreateAddressParam, @Body() data: CreateAddressDto) {
    return this.createAddressService.execute({ user_id: param.user_id, ...data });
  }
}
