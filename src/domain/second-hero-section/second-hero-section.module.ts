import { Module } from '@nestjs/common';
import { SecondHeroSectionService } from './second-hero-section.service';
import { SecondHeroSectionController } from './second-hero-section.controller';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../../domain/auth/auth.module';
import { CloudinaryModule } from '../../lib/cloudinary/cloudinary.module';

@Module({
  controllers: [SecondHeroSectionController],
  providers: [SecondHeroSectionService],
  imports: [DatabaseModule, UserModule, AuthModule, CloudinaryModule],
})
export class SecondHeroSectionModule {}
