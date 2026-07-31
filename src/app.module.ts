import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '~/modules/database/database.module';
import { SystemFeatureGroupPermissionModule } from '~/modules/system-feature-group-permission/system-feature-group-permission.module';
import { SystemFeatureGroupModule } from '~/modules/system-feature-group/system-feature-group.module';
import { SystemFeatureModule } from '~/modules/system-features/system-feature.module';
import { UserModule } from '~/modules/users/users.module';
import repositoriesProviders from '~/shared/repositories/provider';

@Global()
@Module({
  imports: [
    TerminusModule,
    DatabaseModule,
    SystemFeatureModule,
    SystemFeatureGroupModule,
    SystemFeatureGroupPermissionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [...repositoriesProviders],
  exports: [...repositoriesProviders],
})
export class AppModule {}
