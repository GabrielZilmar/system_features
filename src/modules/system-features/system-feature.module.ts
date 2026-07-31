import { Module } from '@nestjs/common';
import { SystemFeatureController } from '~/modules/system-features/system-feature.controller';
import { SystemFeatureService } from '~/modules/system-features/system-feature.service';

@Module({
  imports: [],
  controllers: [SystemFeatureController],
  providers: [SystemFeatureService],
})
export class SystemFeatureModule {}
