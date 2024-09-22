import { Injectable, Inject } from '@nestjs/common'; // Added Inject import
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import refreshJwtConfig from '../config/refresh-jwt-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {
  constructor(
    @Inject(jwtConfig.KEY)
    private JwtConfiguration: ConfigType<typeof jwtConfig>, 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtConfiguration.secret,
      ignoreExpiration: false, 
    });
  }
  async validate(payload: any) {
    return { id: payload.sub , email:payload.email};
  }
}
