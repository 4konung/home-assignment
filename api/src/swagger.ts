import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

const options = new DocumentBuilder()
.setTitle('Questions API')
.setDescription('Questions API documentation')
.build();

export default function initSwagger(app: INestApplication): void {
    const logger = new Logger();

    logger.log('Open api swagger setup');

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true });
}
