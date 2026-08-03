import { CreateSystemFeatureGroupRuleDto } from '~/modules/system-feature-group-rule/dto/create-system-feature-group-rule.dto';
import { SystemFeatureGroupRuleDto } from '~/modules/system-feature-group-rule/dto/system-feature-group-rule.dto';
import { UpdateSystemFeatureGroupRuleDto } from '~/modules/system-feature-group-rule/dto/update-system-feature-group-rule.dto';
import { SystemFeatureGroupRule } from '~/modules/system-feature-group-rule/entities/system-feature-group-rule.entity';

export class SystemFeatureGroupRuleMapper {
  static toDto(rule: SystemFeatureGroupRule): SystemFeatureGroupRuleDto {
    return new SystemFeatureGroupRuleDto({
      id: rule.id,
      ruleSetId: rule.ruleSetId,
      field: rule.field,
      comparisonValues: rule.comparisonValues,
      operator: rule.operator,
    });
  }

  static toEntity(
    ruleDto: CreateSystemFeatureGroupRuleDto | UpdateSystemFeatureGroupRuleDto,
    rule = new SystemFeatureGroupRule(),
  ): SystemFeatureGroupRule {
    if ('ruleSetId' in ruleDto && ruleDto.ruleSetId !== undefined) {
      rule.ruleSetId = ruleDto.ruleSetId;
    }

    if (ruleDto.field !== undefined) {
      rule.field = ruleDto.field;
    }

    if (ruleDto.comparisonValues !== undefined) {
      rule.comparisonValues = ruleDto.comparisonValues;
    }

    if (ruleDto.operator !== undefined) {
      rule.operator = ruleDto.operator;
    }

    return rule;
  }
}
