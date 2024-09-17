import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder() 
    .setTitle('Soda Can APi Service')
    .setDescription('Soda Can APi  documentation')
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
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
