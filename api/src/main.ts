import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppConfiguration } from '@root/common/config/app.config';

import { AppModule } from './app.module';

import initSwagger from '@root/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  const appConfig = app.get(ConfigService).get<AppConfiguration>('app');

  app.setGlobalPrefix(appConfig.globalPrefix);

  if (appConfig.environment !== 'production') {
    initSwagger(app);
  }

  await app.listen(appConfig.port);
}
bootstrap();
