export class SystemFeatureDto {
  id: number;
  key: string;
  displayName: string | null = null;
  description: string | null = null;
  isEnabled: boolean;

  constructor(init: SystemFeatureDto) {
    Object.assign(this, init);
  }
}
