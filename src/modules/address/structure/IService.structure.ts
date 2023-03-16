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

export interface ICreateAddressService {
  execute(data: ICreateAddress): Promise<address>;
}
