import { Module } from '@nestjs/common';
import { AlternatingSectionService } from './alternating-section.service';
import { AlternatingSectionController } from './alternating-section.controller';

@Module({
  controllers: [AlternatingSectionController],
  providers: [AlternatingSectionService],
})
export class AlternatingSectionModule {}
