import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '~/modules/database/database.module';

@Module({
  imports: [TerminusModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
