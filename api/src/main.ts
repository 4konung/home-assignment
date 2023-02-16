import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppConfiguration } from '@root/common/config/app.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });

  const appConfig = app.get(ConfigService).get<AppConfiguration>('app');

  app.setGlobalPrefix(appConfig.globalPrefix);

  await app.listen(appConfig.port);
}
bootstrap();
