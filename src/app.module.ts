import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '~/modules/database/database.module';
import { SystemFeatureAccessControlModule } from '~/modules/system-feature-access-control/system-feature-access-control.module';
import { SystemFeatureGroupMembersModule } from '~/modules/system-feature-group-members/system-feature-group-members.module';
import { SystemFeatureGroupRuleModule } from '~/modules/system-feature-group-rule/system-feature-group-rule.module';
import { SystemFeatureGroupRuleSetModule } from '~/modules/system-feature-group-rule-set/system-feature-group-rule-set.module';
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
    SystemFeatureAccessControlModule,
    SystemFeatureGroupMembersModule,
    SystemFeatureGroupRuleModule,
    SystemFeatureGroupRuleSetModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [...repositoriesProviders],
  exports: [...repositoriesProviders],
})
export class AppModule {}
