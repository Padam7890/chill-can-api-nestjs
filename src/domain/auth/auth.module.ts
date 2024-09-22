import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
// import { AuthGuard } from '../../core/guards/auth.guard';
import jwtConfig from 'src/core/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from 'src/core/config/refresh-jwt-config';
import { RefreshJwtStrategy } from 'src/core/startegies/refresh.startegy';
import { JwtStrategy } from 'src/core/startegies/jwt.startegy';

@Module({
  imports: [
    UserModule, // Import UserModule for UserService
    JwtModule.registerAsync(jwtConfig.asProvider()), // Async config for JWT
    ConfigModule.forFeature(jwtConfig), // Feature for JWT config
    ConfigModule.forFeature(refreshJwtConfig), // Feature for refresh JWT config
  ],
  exports: [AuthService, JwtModule], 
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy], // Include AuthGuard if needed
})
export class AuthModule {}
