import { Seeder } from './seeder';
import { User } from '../../modules/users/entities/user.entity';
import { faker } from '@faker-js/faker';

export class UserSeeder extends Seeder {
  async seed(): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);

    const existingUsersCount = await userRepository.count();
    if (existingUsersCount > 0) {
      console.log('Users table already has data - skipping seeding');
      return;
    }

    const users: Partial<User>[] = [];

    for (let i = 0; i < 5; i++) {
      users.push({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        role: 'entrepreneur',
      });
    }

    for (let i = 0; i < 3; i++) {
      users.push({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        role: 'investor',
      });
    }

    users.push({
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@qvema.com',
      role: 'admin',
    });

    const savedUsers = await userRepository.save(users);
    console.log(`${savedUsers.length} users have been seeded`);
  }
}
