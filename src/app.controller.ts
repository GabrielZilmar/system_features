import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import Env from '~/env';

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
}
