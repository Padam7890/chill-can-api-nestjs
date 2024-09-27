import { Module } from '@nestjs/common';
import { AlternatingSectionService } from './alternating-section.service';
import { AlternatingSectionController } from './alternating-section.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AlternatingSectionController],
  providers: [AlternatingSectionService],
})
export class AlternatingSectionModule {}
