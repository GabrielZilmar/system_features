import { SystemFeatureGroupDto } from '~/modules/system-feature-group/dto/system-feature-group.dto';

export class SystemFeatureGroupPermissionDto {
  groupId: number;
  featureId: number;
  isAllowed: boolean;
  group?: SystemFeatureGroupDto;

  constructor(init: SystemFeatureGroupPermissionDto) {
    Object.assign(this, init);
  }
}
