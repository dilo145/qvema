import { DataSource } from 'typeorm';
import { UserSeeder } from './user.seeder';
import { databaseConfig } from '../../config/database.config';

async function main() {
  console.log('Starting database seeding...');

  // Create a TypeORM data source
  const dataSource = new DataSource({
    ...databaseConfig,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  } as any);

  // Initialize the data source
  await dataSource.initialize();
  console.log('Database connection established');

  try {
    // Run seeders
    console.log('Running User seeder...');
    const userSeeder = new UserSeeder(dataSource);
    await userSeeder.seed();

    console.log('All seeders completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    // Close the database connection
    await dataSource.destroy();
    console.log('Database connection closed');
  }
}

// Run the seeder if this file is executed directly
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
