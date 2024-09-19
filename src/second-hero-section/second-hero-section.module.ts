import { Module } from '@nestjs/common';
import { SecondHeroSectionService } from './second-hero-section.service';
import { SecondHeroSectionController } from './second-hero-section.controller';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SecondHeroSectionController],
  providers: [SecondHeroSectionService],
  imports:[DatabaseModule]
})
export class SecondHeroSectionModule {}
