import { SystemFeatureGroupDto } from '~/modules/system-feature-group/dto/system-feature-group.dto';

export class SystemFeatureAccessControlDto {
  groupId: number;
  featureId: number;
  isAllowed: boolean;
  group?: SystemFeatureGroupDto;

  constructor(init: SystemFeatureAccessControlDto) {
    Object.assign(this, init);
  }
}
