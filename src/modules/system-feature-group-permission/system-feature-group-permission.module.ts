import { Module } from '@nestjs/common';
import { SystemFeatureGroupPermissionController } from '~/modules/system-feature-group-permission/system-feature-group-permission.controller';
import { SystemFeatureGroupPermissionService } from '~/modules/system-feature-group-permission/system-feature-group-permission.service';

@Module({
  imports: [],
  controllers: [SystemFeatureGroupPermissionController],
  providers: [SystemFeatureGroupPermissionService],
})
export class SystemFeatureGroupPermissionModule {}
