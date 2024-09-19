import { Module } from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { HeroSectionController } from './hero-section.controller';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports:[DatabaseModule, UserModule, AuthModule],
  controllers: [HeroSectionController],
  providers: [HeroSectionService, AuthGuard],
  exports: [HeroSectionService],
})
export class HeroSectionModule {

}
