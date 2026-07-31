import { Module } from '@nestjs/common';
import { SystemFeatureGroupRuleSetController } from '~/modules/system-feature-group-rule-set/system-feature-group-rule-set.controller';
import { SystemFeatureGroupRuleSetService } from '~/modules/system-feature-group-rule-set/system-feature-group-rule-set.service';

@Module({
  imports: [],
  controllers: [SystemFeatureGroupRuleSetController],
  providers: [SystemFeatureGroupRuleSetService],
})
export class SystemFeatureGroupRuleSetModule {}
