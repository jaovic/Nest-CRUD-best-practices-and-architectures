import { faker } from '@faker-js/faker';
import { ICreateAddress } from 'src/modules/address/structure/IService.structure';

export const createAddressMock: ICreateAddress = {
  user_id: faker.datatype.uuid(),
  street: faker.address.street(),
  number: faker.address.buildingNumber(),
  neighborhood: faker.lorem.text(),
  complementary_address: faker.lorem.text(),
  city: faker.address.cityName(),
  state: faker.address.county(),
  zip_code: faker.address.zipCode(),
  is_active: faker.datatype.boolean(),
};
