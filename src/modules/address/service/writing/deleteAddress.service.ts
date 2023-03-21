import { Inject, Injectable } from '@nestjs/common';
import { getClassError } from 'src/utils/errors/custom.error';
import { AddressRepository } from '../../repository/address.repository';
import { AddressErrorsCodes } from '../../structure/erros.codes.structure';
import { IAddressRepository } from '../../structure/IRepository.structure';
import { IDeleteAddressService } from '../../structure/IService.structure';

@Injectable()
export class DeleteAddressService implements IDeleteAddressService {
  private _error = getClassError<AddressErrorsCodes>;

  private readonly _addressNotExist = 'error: address does not exist!';
  private readonly _prismaError = 'error: database persistence error, contact admin!';

  constructor(
    @Inject(AddressRepository)
    private readonly addressRepository: IAddressRepository,
  ) {}
  async execute(id: string): Promise<boolean> {
    const addressExist = await this.addressRepository.exists({ id });

    if (!addressExist) throw this._error(this._addressNotExist, AddressErrorsCodes.NOT_FOUND, 404);

    try {
      return this.addressRepository.deleteAddress(id);
    } catch (error) {
      throw this._error(this._prismaError, AddressErrorsCodes.INTERNAL, 500);
    }
  }
}
