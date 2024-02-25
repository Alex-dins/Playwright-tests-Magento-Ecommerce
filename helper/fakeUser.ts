import { faker } from "@faker-js/faker";

export interface FakeUser {
  userUuId: string;
  username: string;
  email: string;
  password: string;
  birthdate: Date;
  userId: string;
}

export const generateFakeUser: () => FakeUser = () => ({
  userUuId: faker.string.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: faker.date.past(),
  userId: faker.string.numeric({ length: { min: 5, max: 10 } }),
});
