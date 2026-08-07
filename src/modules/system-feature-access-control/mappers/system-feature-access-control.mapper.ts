import { CreateSystemFeatureAccessControlDto } from '~/modules/system-feature-access-control/dto/create-system-feature-access-control.dto';
import { SystemFeatureAccessControlDto } from '~/modules/system-feature-access-control/dto/system-feature-access-control.dto';
import { UpdateSystemFeatureAccessControlDto } from '~/modules/system-feature-access-control/dto/update-system-feature-access-control.dto';
import { SystemFeatureAccessControl } from '~/modules/system-feature-access-control/entities/system-feature-access-control.entity';
import { SystemFeatureGroupMapper } from '~/modules/system-feature-group/mappers/system-feature-group.mapper';

export class SystemFeatureAccessControlMapper {
  static toDto(
    accessControl: SystemFeatureAccessControl,
  ): SystemFeatureAccessControlDto {
    const dto = new SystemFeatureAccessControlDto({
      groupId: accessControl.groupId,
      featureId: accessControl.featureId,
      isAllowed: accessControl.isAllowed,
    });

    if (accessControl.group) {
      dto.group = SystemFeatureGroupMapper.toDto(accessControl.group);
    }

    return dto;
  }

  static toEntity(
    accessControlDto:
      | CreateSystemFeatureAccessControlDto
      | UpdateSystemFeatureAccessControlDto,
    accessControl = new SystemFeatureAccessControl(),
  ): SystemFeatureAccessControl {
    if ('groupId' in accessControlDto && accessControlDto.groupId !== undefined) {
      accessControl.groupId = accessControlDto.groupId;
    }

    if ('featureId' in accessControlDto && accessControlDto.featureId !== undefined) {
      accessControl.featureId = accessControlDto.featureId;
    }

    if (accessControlDto.isAllowed !== undefined) {
      accessControl.isAllowed = accessControlDto.isAllowed;
    }

    return accessControl;
  }
}
