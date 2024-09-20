import { Module } from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { HeroSectionController } from './hero-section.controller';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[DatabaseModule, UserModule, AuthModule, CloudinaryModule],
  controllers: [HeroSectionController],
  providers: [HeroSectionService, AuthGuard],
  exports: [HeroSectionService],
})
export class HeroSectionModule {

}
