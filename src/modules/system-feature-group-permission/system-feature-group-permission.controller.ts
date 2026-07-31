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
import { CreateSystemFeatureGroupPermissionDto } from '~/modules/system-feature-group-permission/dto/create-system-feature-group-permission.dto';
import { SystemFeatureGroupPermissionDto } from '~/modules/system-feature-group-permission/dto/system-feature-group-permission.dto';
import { UpdateSystemFeatureGroupPermissionDto } from '~/modules/system-feature-group-permission/dto/update-system-feature-group-permission.dto';
import { SystemFeatureGroupPermissionService } from '~/modules/system-feature-group-permission/system-feature-group-permission.service';

@Controller('system-feature-group-permissions')
export class SystemFeatureGroupPermissionController {
  constructor(
    private readonly systemFeatureGroupPermissionService: SystemFeatureGroupPermissionService,
  ) {}

  @Get()
  async findAll(): Promise<SystemFeatureGroupPermissionDto[]> {
    return this.systemFeatureGroupPermissionService.findAll();
  }

  @Get(':groupId/:featureId')
  async findOne(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('featureId', ParseIntPipe) featureId: number,
  ): Promise<SystemFeatureGroupPermissionDto> {
    return this.systemFeatureGroupPermissionService.findOne(groupId, featureId);
  }

  @Post()
  async create(
    @Body()
    createSystemFeatureGroupPermissionDto: CreateSystemFeatureGroupPermissionDto,
  ): Promise<SystemFeatureGroupPermissionDto> {
    return this.systemFeatureGroupPermissionService.create(
      createSystemFeatureGroupPermissionDto,
    );
  }

  @Patch(':groupId/:featureId')
  async update(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('featureId', ParseIntPipe) featureId: number,
    @Body()
    updateSystemFeatureGroupPermissionDto: UpdateSystemFeatureGroupPermissionDto,
  ): Promise<SystemFeatureGroupPermissionDto> {
    return this.systemFeatureGroupPermissionService.update(
      groupId,
      featureId,
      updateSystemFeatureGroupPermissionDto,
    );
  }

  @Delete(':groupId/:featureId')
  async remove(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('featureId', ParseIntPipe) featureId: number,
  ): Promise<void> {
    await this.systemFeatureGroupPermissionService.remove(groupId, featureId);
  }
}
