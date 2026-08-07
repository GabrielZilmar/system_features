import { SystemFeatureGroupMemberDto } from '~/modules/system-feature-group-members/dto/system-feature-group-member.dto';
import { SystemFeatureGroupRuleSetDto } from '~/modules/system-feature-group-rule-set/dto/system-feature-group-rule-set.dto';

export class SystemFeatureGroupDto {
  id: number;
  name: string;
  members?: SystemFeatureGroupMemberDto[];
  sets?: SystemFeatureGroupRuleSetDto[];

  constructor(init: SystemFeatureGroupDto) {
    Object.assign(this, init);
  }
}
