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
import { CreateSystemFeatureGroupRuleSetDto } from '~/modules/system-feature-group-rule-set/dto/create-system-feature-group-rule-set.dto';
import { SystemFeatureGroupRuleSetDto } from '~/modules/system-feature-group-rule-set/dto/system-feature-group-rule-set.dto';
import { UpdateSystemFeatureGroupRuleSetDto } from '~/modules/system-feature-group-rule-set/dto/update-system-feature-group-rule-set.dto';
import { SystemFeatureGroupRuleSetService } from '~/modules/system-feature-group-rule-set/system-feature-group-rule-set.service';

@Controller('system-feature-group-rule-sets')
export class SystemFeatureGroupRuleSetController {
  constructor(
    private readonly systemFeatureGroupRuleSetService: SystemFeatureGroupRuleSetService,
  ) {}

  @Get()
  async findAll(): Promise<SystemFeatureGroupRuleSetDto[]> {
    return this.systemFeatureGroupRuleSetService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SystemFeatureGroupRuleSetDto> {
    return this.systemFeatureGroupRuleSetService.findOne(id);
  }

  @Post()
  async create(
    @Body()
    createSystemFeatureGroupRuleSetDto: CreateSystemFeatureGroupRuleSetDto,
  ): Promise<SystemFeatureGroupRuleSetDto> {
    return this.systemFeatureGroupRuleSetService.create(
      createSystemFeatureGroupRuleSetDto,
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateSystemFeatureGroupRuleSetDto: UpdateSystemFeatureGroupRuleSetDto,
  ): Promise<SystemFeatureGroupRuleSetDto> {
    return this.systemFeatureGroupRuleSetService.update(
      id,
      updateSystemFeatureGroupRuleSetDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.systemFeatureGroupRuleSetService.remove(id);
  }
}
