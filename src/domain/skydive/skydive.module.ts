import { Module } from '@nestjs/common';
import { SkydiveService } from './skydive.service';
import { SkydiveController } from './skydive.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [SkydiveController],
  providers: [SkydiveService],
})
export class SkydiveModule {}
