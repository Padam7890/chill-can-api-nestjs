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
import { MailModule } from '../../common/service/mail/mail.module';


@Module({
  imports: [
    UserModule, 
    JwtModule.registerAsync(jwtConfig.asProvider()), 
    ConfigModule.forFeature(jwtConfig), 
    ConfigModule.forFeature(refreshJwtConfig), 
    ConfigModule.forFeature(googleOauthConfig),
    MailModule

  ],
  exports: [AuthService, JwtModule], 
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy, GoogleStartegy], 
})
export class AuthModule {}
