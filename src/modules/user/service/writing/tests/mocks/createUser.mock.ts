import { faker } from '@faker-js/faker';

export const createUserMockReturn = {
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  document: faker.random.numeric(10).toString(),
  email: faker.internet.email(),
  created_at: faker.date.between('2023-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
  updated_at: faker.date.between('2023-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
};

export const createUserMock = {
  name: faker.internet.userName(),
  document: faker.random.numeric(10).toString(),
  email: faker.internet.email(),
};
