import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateSystemFeatureGroupRuleDto } from '~/modules/system-feature-group-rule/dto/create-system-feature-group-rule.dto';
import { FindAllSystemFeatureGroupRuleQueryDto } from '~/modules/system-feature-group-rule/dto/find-all-system-feature-group-rule.query.dto';
import { SystemFeatureGroupRuleDto } from '~/modules/system-feature-group-rule/dto/system-feature-group-rule.dto';
import { UpdateSystemFeatureGroupRuleDto } from '~/modules/system-feature-group-rule/dto/update-system-feature-group-rule.dto';
import { SystemFeatureGroupRuleService } from '~/modules/system-feature-group-rule/system-feature-group-rule.service';

@Controller('system-feature-group-rules')
export class SystemFeatureGroupRuleController {
  constructor(
    private readonly systemFeatureGroupRuleService: SystemFeatureGroupRuleService,
  ) {}

  @Get()
  async findAll(
    @Query()
    query: FindAllSystemFeatureGroupRuleQueryDto,
  ): Promise<SystemFeatureGroupRuleDto[]> {
    return this.systemFeatureGroupRuleService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SystemFeatureGroupRuleDto> {
    return this.systemFeatureGroupRuleService.findOne(id);
  }

  @Post()
  async create(
    @Body()
    createSystemFeatureGroupRuleDto: CreateSystemFeatureGroupRuleDto,
  ): Promise<SystemFeatureGroupRuleDto> {
    return this.systemFeatureGroupRuleService.create(
      createSystemFeatureGroupRuleDto,
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateSystemFeatureGroupRuleDto: UpdateSystemFeatureGroupRuleDto,
  ): Promise<SystemFeatureGroupRuleDto> {
    return this.systemFeatureGroupRuleService.update(
      id,
      updateSystemFeatureGroupRuleDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.systemFeatureGroupRuleService.remove(id);
  }
}
