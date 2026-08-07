import { CreateSystemFeatureGroupPermissionDto } from '~/modules/system-feature-group-permission/dto/create-system-feature-group-permission.dto';
import { SystemFeatureGroupPermissionDto } from '~/modules/system-feature-group-permission/dto/system-feature-group-permission.dto';
import { UpdateSystemFeatureGroupPermissionDto } from '~/modules/system-feature-group-permission/dto/update-system-feature-group-permission.dto';
import { SystemFeatureGroupPermission } from '~/modules/system-feature-group-permission/entities/system-feature-group-permission.entity';
import { SystemFeatureGroupMapper } from '~/modules/system-feature-group/mappers/system-feature-group.mapper';

export class SystemFeatureGroupPermissionMapper {
  static toDto(
    permission: SystemFeatureGroupPermission,
  ): SystemFeatureGroupPermissionDto {
    const dto = new SystemFeatureGroupPermissionDto({
      groupId: permission.groupId,
      featureId: permission.featureId,
      isAllowed: permission.isAllowed,
    });

    if (permission.group) {
      dto.group = SystemFeatureGroupMapper.toDto(permission.group);
    }

    return dto;
  }

  static toEntity(
    permissionDto:
      | CreateSystemFeatureGroupPermissionDto
      | UpdateSystemFeatureGroupPermissionDto,
    permission = new SystemFeatureGroupPermission(),
  ): SystemFeatureGroupPermission {
    if ('groupId' in permissionDto && permissionDto.groupId !== undefined) {
      permission.groupId = permissionDto.groupId;
    }

    if ('featureId' in permissionDto && permissionDto.featureId !== undefined) {
      permission.featureId = permissionDto.featureId;
    }

    if (permissionDto.isAllowed !== undefined) {
      permission.isAllowed = permissionDto.isAllowed;
    }

    return permission;
  }
}
