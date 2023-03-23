import { faker } from '@faker-js/faker';
import { address } from '@prisma/client';

export const findAddressMock: address = {
  id: faker.datatype.uuid(),
  user_id: faker.datatype.uuid(),
  street: faker.address.street(),
  number: faker.address.buildingNumber(),
  neighborhood: faker.lorem.text(),
  complementary_address: faker.lorem.text(),
  city: faker.address.cityName(),
  state: faker.address.county(),
  zip_code: faker.address.zipCode(),
  is_active: faker.datatype.boolean(),
  created_at: faker.date.between('2023-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
  updated_at: faker.date.between('2023-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
};
