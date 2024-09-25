import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CloudinaryModule } from './lib/cloudinary/cloudinary.module';
import { CloudinaryService } from './lib/cloudinary/cloudinary.service';
import { DomainModule } from './domain/domain.module';
import { MailService } from './common/service/mail/mail.service';
import { MailModule } from './common/service/mail/mail.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DomainModule,
    CloudinaryModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService, MailService],
})
export class AppModule {}
