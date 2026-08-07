import { SystemFeatureGroupRuleDto } from '~/modules/system-feature-group-rule/dto/system-feature-group-rule.dto';

export class SystemFeatureGroupRuleSetDto {
  id: number;
  groupId: number;
  name: string;
  rules?: SystemFeatureGroupRuleDto[];

  constructor(init: SystemFeatureGroupRuleSetDto) {
    Object.assign(this, init);
  }
}
