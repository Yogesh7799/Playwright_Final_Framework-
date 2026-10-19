import { faker } from '@faker-js/faker';
import { DataRow } from './DataReader';

export interface FakeUser {
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class FakeData {
  static seed(value: number): void {
    faker.seed(value);
  }

  static firstName(): string {
    return faker.person.firstName();
  }

  static lastName(): string {
    return faker.person.lastName();
  }

  static fullName(): string {
    return faker.person.fullName();
  }

  static username(): string {
    return faker.internet.username();
  }

  static email(): string {
    return faker.internet.email();
  }

  static password(length = 12): string {
    return faker.internet.password({ length });
  }

  static phone(): string {
    return faker.phone.number();
  }

  static address(): string {
    return faker.location.streetAddress();
  }

  static city(): string {
    return faker.location.city();
  }

  static state(): string {
    return faker.location.state();
  }

  static zipCode(): string {
    return faker.location.zipCode();
  }

  static country(): string {
    return faker.location.country();
  }

  static uuid(): string {
    return faker.string.uuid();
  }

  static number(min = 0, max = 1000): number {
    return faker.number.int({ min, max });
  }

  static date(): Date {
    return faker.date.past();
  }

  static user(overrides: Partial<FakeUser> = {}): FakeUser {
    return {
      firstName: FakeData.firstName(),
      lastName: FakeData.lastName(),
      fullName: FakeData.fullName(),
      username: FakeData.username(),
      email: FakeData.email(),
      password: FakeData.password(),
      phone: FakeData.phone(),
      address: FakeData.address(),
      city: FakeData.city(),
      state: FakeData.state(),
      zipCode: FakeData.zipCode(),
      country: FakeData.country(),
      ...overrides,
    };
  }

  static users(count: number, overrides: Partial<FakeUser> = {}): FakeUser[] {
    return Array.from({ length: count }, () => FakeData.user(overrides));
  }

  static row(overrides: Partial<DataRow> = {}): DataRow {
    const user = FakeData.user();
    return {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      ...overrides,
    };
  }
}
