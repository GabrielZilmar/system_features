import { ConfigModule } from '@nestjs/config';

const envFilePath = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

void ConfigModule.forRoot({
  envFilePath,
});

export enum Environment {
  LOCAL = 'local',
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
}

export default class Env {
  static get port(): number {
    const port = this.getEnvOrDefault('PORT', '3030');

    return Number(port);
  }

  static get database(): string {
    return this.getEnvOrThrow('DATABASE_NAME');
  }

  private static getEnvOrThrow(envName: string): string {
    const env = process.env[envName];
    if (!env) {
      throw new Error(`Missing environment variable ${envName}`);
    }

    return env;
  }

  private static getEnvOrDefault(
    envName: string,
    defaultValue: string,
  ): string {
    return process.env[envName] ?? defaultValue;
  }
}
