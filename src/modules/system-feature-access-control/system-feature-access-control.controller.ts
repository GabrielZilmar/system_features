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
import { CreateSystemFeatureAccessControlDto } from '~/modules/system-feature-access-control/dto/create-system-feature-access-control.dto';
import { SystemFeatureAccessControlDto } from '~/modules/system-feature-access-control/dto/system-feature-access-control.dto';
import { UpdateSystemFeatureAccessControlDto } from '~/modules/system-feature-access-control/dto/update-system-feature-access-control.dto';
import { SystemFeatureAccessControlService } from '~/modules/system-feature-access-control/system-feature-access-control.service';

@Controller('system-feature-access-controls')
export class SystemFeatureAccessControlController {
  constructor(
    private readonly systemFeatureAccessControlService: SystemFeatureAccessControlService,
  ) {}

  @Get()
  async findAll(): Promise<SystemFeatureAccessControlDto[]> {
    return this.systemFeatureAccessControlService.findAll();
  }

  @Get(':groupId/:featureId')
  async findOne(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('featureId', ParseIntPipe) featureId: number,
  ): Promise<SystemFeatureAccessControlDto> {
    return this.systemFeatureAccessControlService.findOne(groupId, featureId);
  }

  @Post()
  async create(
    @Body()
    createSystemFeatureAccessControlDto: CreateSystemFeatureAccessControlDto,
  ): Promise<SystemFeatureAccessControlDto> {
    return this.systemFeatureAccessControlService.create(
      createSystemFeatureAccessControlDto,
    );
  }

  @Patch(':groupId/:featureId')
  async update(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('featureId', ParseIntPipe) featureId: number,
    @Body()
    updateSystemFeatureAccessControlDto: UpdateSystemFeatureAccessControlDto,
  ): Promise<SystemFeatureAccessControlDto> {
    return this.systemFeatureAccessControlService.update(
      groupId,
      featureId,
      updateSystemFeatureAccessControlDto,
    );
  }

  @Delete(':groupId/:featureId')
  async remove(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('featureId', ParseIntPipe) featureId: number,
  ): Promise<void> {
    await this.systemFeatureAccessControlService.remove(groupId, featureId);
  }
}
