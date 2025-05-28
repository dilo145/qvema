import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../../modules/users/entities/user.entity';
import { Interest } from '../../modules/interests/entities/interest.entity';
import * as bcrypt from 'bcrypt';

export default class InitialDataSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const interestRepository = dataSource.getRepository(Interest);

    const interestsData = [
      { name: 'Technology' },
      { name: 'Environment' },
      { name: 'Healthcare' },
      { name: 'Education' },
      { name: 'Finance' },
      { name: 'Food' },
      { name: 'Real Estate' },
      { name: 'Entertainment' },
      { name: 'Art' },
      { name: 'Sports' },
    ];

    for (const interestData of interestsData) {
      const existingInterest = await interestRepository.findOne({
        where: { name: interestData.name },
      });

      if (!existingInterest) {
        const interest = interestRepository.create(interestData);
        await interestRepository.save(interest);
        console.log(`Created interest: ${interestData.name}`);
      }
    }

    const adminExists = await userRepository.findOne({
      where: { email: 'admin@example.com' },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = userRepository.create({
        email: 'admin@example.com',
        password: hashedPassword,
        firstname: 'Admin',
        lastname: 'User',
        role: 'admin',
      });
      await userRepository.save(admin);
      console.log('Created admin user');
    }

    const entrepreneurExists = await userRepository.findOne({
      where: { email: 'entrepreneur@example.com' },
    });

    if (!entrepreneurExists) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const entrepreneur = userRepository.create({
        email: 'entrepreneur@example.com',
        password: hashedPassword,
        firstname: 'John',
        lastname: 'Doe',
        role: 'entrepreneur',
      });
      await userRepository.save(entrepreneur);
      console.log('Created entrepreneur user');
    }

    const investorExists = await userRepository.findOne({
      where: { email: 'investor@example.com' },
    });

    if (!investorExists) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const investor = userRepository.create({
        email: 'investor@example.com',
        password: hashedPassword,
        firstname: 'Jane',
        lastname: 'Smith',
        role: 'investor',
      });
      await userRepository.save(investor);
      console.log('Created investor user');
    }
  }
}