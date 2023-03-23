import { Inject, Injectable } from '@nestjs/common';
import { address } from '@prisma/client';
import { UserRepository } from '../.../../../../user/repository/user.repository';
import { IUserRepository } from '../.../../../../user/structure/IRepository.structure';
import { getClassError } from '../../../../utils/errors/custom.error';
import { AddressRepository } from '../../repository/address.repository';
import { AddressErrorsCodes } from '../../structure/erros.codes.structure';
import { IAddressRepository } from '../../structure/IRepository.structure';
import { ICreateAddress, ICreateAddressService } from '../../structure/IService.structure';

@Injectable()
export class CreateAddressService implements ICreateAddressService {
  private _error = getClassError<AddressErrorsCodes>;

  private readonly _userNotExist = 'error: user does not exist!';
  private readonly _prismaError = 'error: database persistence error, contact admin!';

  constructor(
    @Inject(AddressRepository)
    private readonly addressRepository: IAddressRepository,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(data: ICreateAddress): Promise<address> {
    const userExist = await this.userRepository.exists({ id: data.user_id });

    if (!userExist) throw this._error(this._userNotExist, AddressErrorsCodes.NOT_FOUND, 404);

    try {
      return this.addressRepository.create(data);
    } catch (error) {
      throw this._error(this._prismaError, AddressErrorsCodes.INTERNAL, 500);
    }
  }
}
