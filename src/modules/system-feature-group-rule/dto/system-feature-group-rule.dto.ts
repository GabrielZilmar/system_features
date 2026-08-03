import { SystemFeaturesAccessDynamicGroupRulesOperatorEnum } from '~/modules/system-feature-group-rule/entities/system-feature-group-rule.entity';
import { GroupRuleFields } from '~/modules/system-feature-group-rule/constants';

export class SystemFeatureGroupRuleDto {
  id: number;
  ruleSetId: number;
  field: GroupRuleFields;
  comparisonValues: string[];
  operator: SystemFeaturesAccessDynamicGroupRulesOperatorEnum;

  constructor(init: SystemFeatureGroupRuleDto) {
    Object.assign(this, init);
  }
}
