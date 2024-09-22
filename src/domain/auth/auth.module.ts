import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
// import { AuthGuard } from '../../core/guards/auth.guard';
import jwtConfig from '../../core/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from '../../core/config/refresh-jwt-config';
import { RefreshJwtStrategy } from '../../core/startegies/refresh.startegy';
import { JwtStrategy } from '../../core/startegies/jwt.startegy';
import googleOauthConfig from '../../core/config/google-oauth.config';
import { GoogleStartegy } from '../../core/startegies/google.startegy';
import { LocalStrategy } from '../../core/startegies/local.startegy';


@Module({
  imports: [
    UserModule, // Import UserModule for UserService
    JwtModule.registerAsync(jwtConfig.asProvider()), // Async config for JWT
    ConfigModule.forFeature(jwtConfig), // Feature for JWT config
    ConfigModule.forFeature(refreshJwtConfig), // Feature for refresh JWT config
    ConfigModule.forFeature(googleOauthConfig)

  ],
  exports: [AuthService, JwtModule], 
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy, JwtStrategy, RefreshJwtStrategy, GoogleStartegy], // Include AuthGuard if needed
})
export class AuthModule {}
