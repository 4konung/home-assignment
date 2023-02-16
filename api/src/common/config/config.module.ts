import { config } from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { appConfiguration } from '@root/common/config/app.config';
import { inferenceRunnerConfig } from '@root/modules/inference-runner/inference-runner.config';

config();

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration, inferenceRunnerConfig],
    }),
  ],
})
export class ConfigModule {}
