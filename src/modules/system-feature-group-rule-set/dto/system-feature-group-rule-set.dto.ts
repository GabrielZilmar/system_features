export class SystemFeatureGroupRuleSetDto {
  id: number;
  groupId: number;
  name: string;

  constructor(init: SystemFeatureGroupRuleSetDto) {
    Object.assign(this, init);
  }
}
