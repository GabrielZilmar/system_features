import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateSystemFeatureGroupMemberDto } from '~/modules/system-feature-group-members/dto/create-system-feature-group-member.dto';
import { SystemFeatureGroupMemberDto } from '~/modules/system-feature-group-members/dto/system-feature-group-member.dto';
import { SystemFeatureGroupMembersService } from '~/modules/system-feature-group-members/system-feature-group-members.service';

@Controller('system-feature-group-members')
export class SystemFeatureGroupMembersController {
  constructor(
    private readonly systemFeatureGroupMembersService: SystemFeatureGroupMembersService,
  ) {}

  @Get()
  async findAll(): Promise<SystemFeatureGroupMemberDto[]> {
    return this.systemFeatureGroupMembersService.findAll();
  }

  @Get(':groupId/:userId')
  async findOne(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<SystemFeatureGroupMemberDto> {
    return this.systemFeatureGroupMembersService.findOne(groupId, userId);
  }

  @Post()
  async create(
    @Body()
    createSystemFeatureGroupMemberDto: CreateSystemFeatureGroupMemberDto,
  ): Promise<SystemFeatureGroupMemberDto> {
    return this.systemFeatureGroupMembersService.create(
      createSystemFeatureGroupMemberDto,
    );
  }

  @Delete(':groupId/:userId')
  async remove(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.systemFeatureGroupMembersService.remove(groupId, userId);
  }
}
