import { Module } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { FlavorController } from './flavor.controller';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [FlavorController],
  providers: [FlavorService],
})
export class FlavorModule {}
