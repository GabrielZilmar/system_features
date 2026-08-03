import { Module } from '@nestjs/common';
import { SystemFeatureGroupRuleController } from '~/modules/system-feature-group-rule/system-feature-group-rule.controller';
import { SystemFeatureGroupRuleService } from '~/modules/system-feature-group-rule/system-feature-group-rule.service';

@Module({
  imports: [],
  controllers: [SystemFeatureGroupRuleController],
  providers: [SystemFeatureGroupRuleService],
})
export class SystemFeatureGroupRuleModule {}
