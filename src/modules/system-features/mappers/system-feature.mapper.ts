import { SystemFeature } from '~/modules/system-features/entities/system-features.entity';
import { CreateSystemFeatureDto } from '~/modules/system-features/dto/create-system-feature.dto';
import { SystemFeatureDto } from '~/modules/system-features/dto/system-feature.dto';
import { UpdateSystemFeatureDto } from '~/modules/system-features/dto/update-system-feature.dto';
import { SystemFeatureGroupPermissionMapper } from '~/modules/system-feature-group-permission/mappers/system-feature-group-permission.mapper';

export class SystemFeatureMapper {
  static toDto(systemFeature: SystemFeature): SystemFeatureDto {
    const dto = new SystemFeatureDto({
      id: systemFeature.id,
      key: systemFeature.key,
      displayName: systemFeature.displayName,
      description: systemFeature.description,
      isEnabled: systemFeature.isEnabled,
    });

    if (systemFeature.groupPermissions) {
      dto.groupPermissions = systemFeature.groupPermissions.map(
        SystemFeatureGroupPermissionMapper.toDto,
      );
    }

    return dto;
  }

  static toEntity(
    systemFeatureDto: CreateSystemFeatureDto | UpdateSystemFeatureDto,
    systemFeature = new SystemFeature(),
  ): SystemFeature {
    if (systemFeatureDto.key) {
      systemFeature.key = systemFeatureDto.key;
    }

    if (systemFeatureDto.displayName !== undefined) {
      systemFeature.displayName = systemFeatureDto.displayName;
    }

    if (systemFeatureDto.description !== undefined) {
      systemFeature.description = systemFeatureDto.description;
    }

    if (systemFeatureDto.isEnabled !== undefined) {
      systemFeature.isEnabled = systemFeatureDto.isEnabled;
    }

    return systemFeature;
  }
}
