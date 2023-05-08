import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/app.log' }),
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('Teams API')
    .setDescription('Mind teams API')
    .setVersion('1.0')
    .addTag('teams')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
