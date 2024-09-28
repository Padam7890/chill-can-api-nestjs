import { Module } from '@nestjs/common';
import { AlternatingSectionService } from './alternating-section.service';
import { AlternatingSectionController } from './alternating-section.controller';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AlternatingSectionController],
  providers: [AlternatingSectionService],
})
export class AlternatingSectionModule {}
