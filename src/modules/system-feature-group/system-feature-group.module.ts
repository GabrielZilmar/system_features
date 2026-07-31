import { Module } from '@nestjs/common';
import { SystemFeatureGroupController } from '~/modules/system-feature-group/system-feature-group.controller';
import { SystemFeatureGroupService } from '~/modules/system-feature-group/system-feature-group.service';

@Module({
  imports: [],
  controllers: [SystemFeatureGroupController],
  providers: [SystemFeatureGroupService],
})
export class SystemFeatureGroupModule {}
