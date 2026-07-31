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
import { CreateSystemFeatureGroupDto } from '~/modules/system-feature-group/dto/create-system-feature-group.dto';
import { SystemFeatureGroupDto } from '~/modules/system-feature-group/dto/system-feature-group.dto';
import { UpdateSystemFeatureGroupDto } from '~/modules/system-feature-group/dto/update-system-feature-group.dto';
import { SystemFeatureGroupService } from '~/modules/system-feature-group/system-feature-group.service';

@Controller('system-feature-groups')
export class SystemFeatureGroupController {
  constructor(
    private readonly systemFeatureGroupService: SystemFeatureGroupService,
  ) {}

  @Get()
  async findAll(): Promise<SystemFeatureGroupDto[]> {
    return this.systemFeatureGroupService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SystemFeatureGroupDto> {
    return this.systemFeatureGroupService.findOne(id);
  }

  @Post()
  async create(
    @Body() createSystemFeatureGroupDto: CreateSystemFeatureGroupDto,
  ): Promise<SystemFeatureGroupDto> {
    return this.systemFeatureGroupService.create(createSystemFeatureGroupDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSystemFeatureGroupDto: UpdateSystemFeatureGroupDto,
  ): Promise<SystemFeatureGroupDto> {
    return this.systemFeatureGroupService.update(
      id,
      updateSystemFeatureGroupDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.systemFeatureGroupService.remove(id);
  }
}
