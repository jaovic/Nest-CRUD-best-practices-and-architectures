import { faker } from '@faker-js/faker';

export const changeStatusAddressMock = {
  address_id: faker.datatype.uuid(),
  is_active: faker.datatype.boolean(),
};
