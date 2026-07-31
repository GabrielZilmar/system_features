import { CreateSystemFeatureGroupDto } from '~/modules/system-feature-group/dto/create-system-feature-group.dto';
import { SystemFeatureGroupDto } from '~/modules/system-feature-group/dto/system-feature-group.dto';
import { UpdateSystemFeatureGroupDto } from '~/modules/system-feature-group/dto/update-system-feature-group.dto';
import { SystemFeatureGroup } from '~/modules/system-feature-group/entities/system-feature-group.entity';

export class SystemFeatureGroupMapper {
  static toDto(systemFeatureGroup: SystemFeatureGroup): SystemFeatureGroupDto {
    return new SystemFeatureGroupDto({
      id: systemFeatureGroup.id,
      name: systemFeatureGroup.name,
    });
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
