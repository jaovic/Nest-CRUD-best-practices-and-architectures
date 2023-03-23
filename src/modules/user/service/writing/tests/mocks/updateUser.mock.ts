import { faker } from '@faker-js/faker';
import { IUpdateUser } from 'src/modules/user/structure/IService.structure';

export const UpdateUserMock: IUpdateUser = {
  user: { user_id: faker.internet.userName() },
  body: {
    name: faker.internet.userName(),
    document: faker.random.numeric(10).toString(),
    email: faker.internet.email(),
  },
};
