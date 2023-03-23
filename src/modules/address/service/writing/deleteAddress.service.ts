import { Inject, Injectable } from '@nestjs/common';
import { getClassError } from '../../../../utils/errors/custom.error';
import { AddressRepository } from '../../repository/address.repository';
import { AddressErrorsCodes } from '../../structure/erros.codes.structure';
import { IAddressRepository } from '../../structure/IRepository.structure';
import { IDeleteAddress, IDeleteAddressService } from '../../structure/IService.structure';

@Injectable()
export class DeleteAddressService implements IDeleteAddressService {
  private _error = getClassError<AddressErrorsCodes>;

  private readonly _addressNotExist = 'error: address does not exist!';
  private readonly _prismaError = 'error: database persistence error, contact admin!';

  constructor(
    @Inject(AddressRepository)
    private readonly addressRepository: IAddressRepository,
  ) {}
  async execute(data: IDeleteAddress): Promise<boolean> {
    const addressExist = await this.addressRepository.exists({ id: data.id });

    if (!addressExist) throw this._error(this._addressNotExist, AddressErrorsCodes.NOT_FOUND, 404);

    try {
      return this.addressRepository.deleteAddress(data.id);
    } catch (error) {
      throw this._error(this._prismaError, AddressErrorsCodes.INTERNAL, 500);
    }
  }
}
