import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  GROUP_RULE_FIELDS,
  GroupRuleFields,
} from '~/modules/system-feature-group-rule/constants';
import { SystemFeaturesAccessDynamicGroupRulesOperatorEnum } from '~/modules/system-feature-group-rule/entities/system-feature-group-rule.entity';

export class UpdateSystemFeatureGroupRuleDto {
  @IsOptional()
  @IsString()
  @IsIn(Object.values(GROUP_RULE_FIELDS))
  @MaxLength(255)
  field?: GroupRuleFields;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  comparisonValues?: string[];

  @IsOptional()
  @IsEnum(SystemFeaturesAccessDynamicGroupRulesOperatorEnum)
  operator?: SystemFeaturesAccessDynamicGroupRulesOperatorEnum;
}
