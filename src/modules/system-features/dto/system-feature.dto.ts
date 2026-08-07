import { SystemFeatureGroupPermissionDto } from '~/modules/system-feature-group-permission/dto/system-feature-group-permission.dto';

export class SystemFeatureDto {
  id: number;
  key: string;
  displayName: string | null = null;
  description: string | null = null;
  isEnabled: boolean;
  groupPermissions?: SystemFeatureGroupPermissionDto[];

  constructor(init: SystemFeatureDto) {
    Object.assign(this, init);
  }
}
