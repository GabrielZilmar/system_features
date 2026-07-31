export class SystemFeatureGroupDto {
  id: number;
  name: string;

  constructor(init: SystemFeatureGroupDto) {
    Object.assign(this, init);
  }
}
