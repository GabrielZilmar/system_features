import { Module } from '@nestjs/common';
import { SystemFeatureAccessControlController } from '~/modules/system-feature-access-control/system-feature-access-control.controller';
import { SystemFeatureAccessControlService } from '~/modules/system-feature-access-control/system-feature-access-control.service';

@Module({
  imports: [],
  controllers: [SystemFeatureAccessControlController],
  providers: [SystemFeatureAccessControlService],
})
export class SystemFeatureAccessControlModule {}
