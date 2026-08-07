import { SystemFeatureAccessControlDto } from '~/modules/system-feature-access-control/dto/system-feature-access-control.dto';

export class SystemFeatureDto {
  id: number;
  key: string;
  displayName: string | null = null;
  description: string | null = null;
  isEnabled: boolean;
  accessControls?: SystemFeatureAccessControlDto[];

  constructor(init: SystemFeatureDto) {
    Object.assign(this, init);
  }
}
