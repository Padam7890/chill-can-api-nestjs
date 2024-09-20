import { Module } from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { HeroSectionController } from './hero-section.controller';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../../domain/auth/auth.module';
import { DatabaseModule } from '../../database/database.module';
import { CloudinaryModule } from '../../lib/cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, CloudinaryModule],
  controllers: [HeroSectionController],
  providers: [HeroSectionService, AuthGuard],
  exports: [HeroSectionService],
})
export class HeroSectionModule {}
