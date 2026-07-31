export class SystemFeatureGroupMemberDto {
  groupId: number;
  userId: number;

  constructor(init: SystemFeatureGroupMemberDto) {
    Object.assign(this, init);
  }
}
