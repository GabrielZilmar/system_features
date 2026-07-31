import { Module } from '@nestjs/common';
import { SystemFeatureGroupMembersController } from '~/modules/system-feature-group-members/system-feature-group-members.controller';
import { SystemFeatureGroupMembersService } from '~/modules/system-feature-group-members/system-feature-group-members.service';

@Module({
  imports: [],
  controllers: [SystemFeatureGroupMembersController],
  providers: [SystemFeatureGroupMembersService],
})
export class SystemFeatureGroupMembersModule {}
