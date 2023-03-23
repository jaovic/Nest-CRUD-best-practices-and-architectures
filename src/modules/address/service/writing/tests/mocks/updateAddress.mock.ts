import { faker } from '@faker-js/faker';
import { IUpdateAddress } from 'src/modules/address/structure/IService.structure';

export const UpdateAddressMock: IUpdateAddress = {
  address: { address_id: faker.internet.userName() },
  body: {
    street: faker.address.street(),
    number: faker.address.buildingNumber(),
    neighborhood: faker.lorem.text(),
    complementary_address: faker.lorem.text(),
    city: faker.address.cityName(),
    state: faker.address.county(),
    zip_code: faker.address.zipCode(),
    is_active: faker.datatype.boolean(),
  },
};
