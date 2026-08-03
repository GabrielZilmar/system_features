import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import {
  GROUP_RULE_FIELDS,
  GroupRuleFields,
} from '~/modules/system-feature-group-rule/constants';
import { SystemFeaturesAccessDynamicGroupRulesOperatorEnum } from '~/modules/system-feature-group-rule/entities/system-feature-group-rule.entity';

export class CreateSystemFeatureGroupRuleDto {
  @IsInt()
  @Min(1)
  ruleSetId: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(GROUP_RULE_FIELDS))
  @MaxLength(255)
  field: GroupRuleFields;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  comparisonValues: string[];

  @IsEnum(SystemFeaturesAccessDynamicGroupRulesOperatorEnum)
  operator: SystemFeaturesAccessDynamicGroupRulesOperatorEnum;
}
