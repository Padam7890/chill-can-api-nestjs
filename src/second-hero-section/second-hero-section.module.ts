import { Module } from '@nestjs/common';
import { SecondHeroSectionService } from './second-hero-section.service';
import { SecondHeroSectionController } from './second-hero-section.controller';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [SecondHeroSectionController],
  providers: [SecondHeroSectionService],
  imports:[DatabaseModule, UserModule, AuthModule, CloudinaryModule ]
})
export class SecondHeroSectionModule {}

