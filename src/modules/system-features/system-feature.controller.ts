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
import { CreateSystemFeatureDto } from '~/modules/system-features/dto/create-system-feature.dto';
import { SystemFeatureDto } from '~/modules/system-features/dto/system-feature.dto';
import { UpdateSystemFeatureDto } from '~/modules/system-features/dto/update-system-feature.dto';
import { SystemFeatureService } from '~/modules/system-features/system-feature.service';

@Controller('system-features')
export class SystemFeatureController {
  constructor(private readonly systemFeatureService: SystemFeatureService) {}

  @Get()
  async findAll(): Promise<SystemFeatureDto[]> {
    return this.systemFeatureService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SystemFeatureDto> {
    return this.systemFeatureService.findOne(id);
  }

  @Post()
  async create(
    @Body() createSystemFeatureDto: CreateSystemFeatureDto,
  ): Promise<SystemFeatureDto> {
    return this.systemFeatureService.create(createSystemFeatureDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSystemFeatureDto: UpdateSystemFeatureDto,
  ): Promise<SystemFeatureDto> {
    return this.systemFeatureService.update(id, updateSystemFeatureDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.systemFeatureService.remove(id);
  }
}
