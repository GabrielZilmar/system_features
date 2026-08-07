import { CreateSystemFeatureGroupRuleSetDto } from '~/modules/system-feature-group-rule-set/dto/create-system-feature-group-rule-set.dto';
import { SystemFeatureGroupRuleSetDto } from '~/modules/system-feature-group-rule-set/dto/system-feature-group-rule-set.dto';
import { UpdateSystemFeatureGroupRuleSetDto } from '~/modules/system-feature-group-rule-set/dto/update-system-feature-group-rule-set.dto';
import { SystemFeatureGroupRuleSet } from '~/modules/system-feature-group-rule-set/entities/system-feature-group-rule-set.entity';
import { SystemFeatureGroupRuleMapper } from '~/modules/system-feature-group-rule/mappers/system-feature-group-rule.mapper';

export class SystemFeatureGroupRuleSetMapper {
  static toDto(
    ruleSet: SystemFeatureGroupRuleSet,
  ): SystemFeatureGroupRuleSetDto {
    const dto = new SystemFeatureGroupRuleSetDto({
      id: ruleSet.id,
      groupId: ruleSet.groupId,
      name: ruleSet.name,
    });

    if (ruleSet.rules) {
      dto.rules = ruleSet.rules.map(SystemFeatureGroupRuleMapper.toDto);
    }

    return dto;
  }

  static toEntity(
    ruleSetDto:
      CreateSystemFeatureGroupRuleSetDto | UpdateSystemFeatureGroupRuleSetDto,
    ruleSet = new SystemFeatureGroupRuleSet(),
  ): SystemFeatureGroupRuleSet {
    if ('groupId' in ruleSetDto && ruleSetDto.groupId !== undefined) {
      ruleSet.groupId = ruleSetDto.groupId;
    }

    if (ruleSetDto.name !== undefined) {
      ruleSet.name = ruleSetDto.name;
    }

    return ruleSet;
  }
}
