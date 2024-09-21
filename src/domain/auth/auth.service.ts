import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { signInDTO } from './dto/auth';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import refreshJwtConfig from 'src/core/config/refresh-jwt-config';
import jwtConfig from 'src/core/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    @Inject(jwtConfig.KEY) private accessTokenConfig: ConfigType<typeof jwtConfig> // Added accessTokenConfig injection
  ) {}

  async signIn(sigIn: signInDTO): Promise<any> {
    const user = await this.userService.findOne(sigIn.email);
    if (!user) {
      throw new UnauthorizedException(`User ${sigIn.email} not found`);
    }
    const isMatch = await bcrypt.compare(sigIn.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Password');
    }
    const token = await this.createToken(user);
    const refresh_token = await this.createRefreshToken(user);
    return {
      message: "User SignIn Successfully",
      access_token: token.access_token,
      refresh_token: refresh_token.refreshToken,
      user: user,
    };
  }

  async signUp(data: CreateUserDto): Promise<any> {
    const user = await this.userService.create(data);
    const token = await this.createToken(user);
    const refresh_token = await this.createRefreshToken(user);
    console.log(token,refresh_token)

    return {
      message: "User SignUp Successfully",
      access_token: token.access_token,
      refresh_token: refresh_token.refreshToken,
      user: user,
    };
  }

  // Generate access token using jwtConfig
  private async createToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload, this.accessTokenConfig);
    return { access_token };
  }

  // Generate refresh token using refreshJwtConfig
  private async createRefreshToken(user: User): Promise<{ refreshToken: string }> {
    const payload = { sub: user.id, email: user.email };
    const refreshToken = await this.jwtService.signAsync(payload, this.refreshTokenConfig);
    return { refreshToken };
  }
}
