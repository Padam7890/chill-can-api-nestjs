import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './core/filters/http-exception.filter';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.setGlobalPrefix('api/v1');


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());



  const config = new DocumentBuilder() 
    .setTitle('Chill Can APi Service')
    .setDescription('Chill Can APi  documentation')
    .setExternalDoc('API Documentation', 'docs/')
    .addSecurityRequirements('JWT-auth')
    .addServer('http://localhost:3001')
    .addServer('https://chill-can-api-nestjs.vercel.app/')
    .setContact('Chill Can', 'https://chill-can-nextjs.vercel.app/', 'info@sodacan.com')
    .setTermsOfService('/Terms')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'JWT Authorization',
      in: 'header',
    }, "JWT-auth")
    .build();
  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api/docs', app, document,{
    jsonDocumentUrl: "api/docs/json",
  });
  await app.listen(3001);
}
bootstrap();
