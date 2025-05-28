import { DataSource } from 'typeorm';

export abstract class Seeder {
  constructor(protected readonly dataSource: DataSource) {}

  abstract seed(): Promise<void>;
}
