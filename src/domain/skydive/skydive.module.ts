import { Module } from '@nestjs/common';
import { SkydiveService } from './skydive.service';
import { SkydiveController } from './skydive.controller';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { FlavorModule } from '../flavor/flavor.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, FlavorModule],
  controllers: [SkydiveController],
  providers: [SkydiveService],
})
export class SkydiveModule {}
