import { Module } from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { HeroSectionController } from './hero-section.controller';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [HeroSectionController],
  providers: [HeroSectionService, AuthGuard],
  exports: [HeroSectionService],
  imports:[UserModule, AuthModule]
})
export class HeroSectionModule {}
