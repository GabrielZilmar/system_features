import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppDataSource } from '~/modules/database/config/data-source';

@Global()
@Module({
  controllers: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
          await AppDataSource.runMigrations();
        }

        return AppDataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
