import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Feature } from '~/decorators/feature.decorator';
import Env from '~/env';
import { FeatureGuard } from '~/guard/feature.guard';
import { SYSTEM_FEATURE_KEYS } from '~/modules/system-features/constants';

@Controller()
export class AppController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @Get('/health')
  @HealthCheck()
  health() {
    return this.healthCheckService.check([
      () => this.db.pingCheck(Env.database, { connection: this.dataSource }),
    ]);
  }

  @Get('/access')
  @UseGuards(FeatureGuard)
  @Feature(SYSTEM_FEATURE_KEYS.WALLET)
  access() {
    return { message: SYSTEM_FEATURE_KEYS.WALLET };
  }
}
