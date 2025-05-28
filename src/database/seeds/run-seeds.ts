import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { databaseConfig } from '../../config/database.config';
import InitialDataSeeder from './initial-data.seed';

const dataSource = new DataSource(databaseConfig as DataSourceOptions);

async function runAllSeeders() {
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: [InitialDataSeeder],
  });

  await dataSource.destroy();

  console.log('All seeds have been executed successfully!');
}

runAllSeeders().catch(error => {
  console.error('Error running seeds:', error);
  process.exit(1);
});