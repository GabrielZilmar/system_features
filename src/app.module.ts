import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '~/modules/database/database.module';
import { SystemFeatureModule } from '~/modules/system-features/system-feature.module';
import repositoriesProviders from '~/shared/repositories/provider';

@Global()
@Module({
  imports: [TerminusModule, DatabaseModule, SystemFeatureModule],
  controllers: [AppController],
  providers: [...repositoriesProviders],
  exports: [...repositoriesProviders],
})
export class AppModule {}
