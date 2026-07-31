export class SystemFeatureGroupPermissionDto {
  groupId: number;
  featureId: number;
  isAllowed: boolean;

  constructor(init: SystemFeatureGroupPermissionDto) {
    Object.assign(this, init);
  }
}
