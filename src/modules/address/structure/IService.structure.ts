import { address } from '@prisma/client';

export interface ICreateAddress {
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

export interface IFindAddress {
  address_id: string;
}

export interface IFindUserActiveAddress {
  user_id: string;
}

export interface IUpdateAddress {
  address: { address_id: string };
  body: Partial<address>;
}

export interface IChangeStatusAddress {
  address_id: string;
  is_active: boolean;
}

export interface IDeleteAddress {
  id: string;
}

export interface ICreateAddressService {
  execute(data: ICreateAddress): Promise<address>;
}

export interface IFindAddressService {
  execute(data: IFindAddress): Promise<address>;
}

export interface IFindUserActiveAddressService {
  execute(data: IFindUserActiveAddress): Promise<address>;
}

export interface IUpdateAddressService {
  execute(data: IUpdateAddress): Promise<address>;
}

export interface IChangeStatusAddressService {
  execute(data: IChangeStatusAddress): Promise<address>;
}

export interface IDeleteAddressService {
  execute(data: IDeleteAddress): Promise<boolean>;
}
