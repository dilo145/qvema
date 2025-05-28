import { DataSource } from 'typeorm';
import { UserSeeder } from './user.seeder';
import { databaseConfig } from '../../config/database.config';

async function main() {
  console.log('Starting database seeding...');

  const dataSource = new DataSource({
    ...databaseConfig,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  } as any);

  await dataSource.initialize();
  console.log('Database connection established');

  try {
    console.log('Running User seeder...');
    const userSeeder = new UserSeeder(dataSource);
    await userSeeder.seed();

    console.log('All seeders completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
    console.log('Database connection closed');
  }
}

if (require.main === module) {
  main()
    .then(() => {
      console.log('Seeding complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

export { main as seedDatabase };
