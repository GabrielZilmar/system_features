import { CreateSystemFeatureGroupDto } from '~/modules/system-feature-group/dto/create-system-feature-group.dto';
import { SystemFeatureGroupDto } from '~/modules/system-feature-group/dto/system-feature-group.dto';
import { UpdateSystemFeatureGroupDto } from '~/modules/system-feature-group/dto/update-system-feature-group.dto';
import { SystemFeatureGroup } from '~/modules/system-feature-group/entities/system-feature-group.entity';
import { SystemFeatureGroupMemberMapper } from '~/modules/system-feature-group-members/mappers/system-feature-group-member.mapper';
import { SystemFeatureGroupRuleSetMapper } from '~/modules/system-feature-group-rule-set/mappers/system-feature-group-rule-set.mapper';

export class SystemFeatureGroupMapper {
  static toDto(systemFeatureGroup: SystemFeatureGroup): SystemFeatureGroupDto {
    const dto = new SystemFeatureGroupDto({
      id: systemFeatureGroup.id,
      name: systemFeatureGroup.name,
    });

    if (systemFeatureGroup.members) {
      dto.members = systemFeatureGroup.members.map(
        SystemFeatureGroupMemberMapper.toDto,
      );
    }

    if (systemFeatureGroup.sets) {
      dto.sets = systemFeatureGroup.sets.map(SystemFeatureGroupRuleSetMapper.toDto);
    }

    return dto;
  }

  static toEntity(
    systemFeatureGroupDto:
      CreateSystemFeatureGroupDto | UpdateSystemFeatureGroupDto,
    systemFeatureGroup = new SystemFeatureGroup(),
  ): SystemFeatureGroup {
    if (systemFeatureGroupDto.name) {
      systemFeatureGroup.name = systemFeatureGroupDto.name;
    }

    return systemFeatureGroup;
  }
}
