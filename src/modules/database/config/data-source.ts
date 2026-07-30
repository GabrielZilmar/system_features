import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import databaseConfig from '~/modules/database/config/database';

const isTestEnvironment = process.env.NODE_ENV === 'test';

export const dataSourceOptions = {
  type: 'postgres',
  port: databaseConfig.port,
  host: databaseConfig.databaseHost,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  synchronize: isTestEnvironment,
  dropSchema: isTestEnvironment,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [join(__dirname, '../../../modules/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  subscribers: [join(__dirname, '../subscribers/*{.ts,.js}')],
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);
