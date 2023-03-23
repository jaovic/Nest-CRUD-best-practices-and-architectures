import { address } from '@prisma/client';

export interface ICreateAddressRepository {
  user_id: string;
  street: string;
  number: string;
  neighborhood: string;
  complementary_address: string;
  city: string;
  state: string;
  zip_code: string;
  is_active: boolean;
}

export interface IUpdateAddressRepository {
  address: { address_id: string };
  body: Partial<address>;
}

export interface IChangeStatusAddressRepository {
  address_id: string;
  is_active: boolean;
}

export interface IAddressRepository {
  exists(where: Partial<address>, select?: object): Promise<address | Partial<address> | null>;
  create(data: ICreateAddressRepository): Promise<address>;
  findAddress(id: string): Promise<address>;
  findUserActiveAddress(id: string): Promise<address>;
  updateAddress(data: IUpdateAddressRepository): Promise<address>;
  changeStatusAddress(data: IChangeStatusAddressRepository): Promise<address>;
  deleteAddress(id: string): Promise<boolean>;
}
