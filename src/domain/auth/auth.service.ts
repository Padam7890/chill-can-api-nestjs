import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import refreshJwtConfig from '../../core/config/refresh-jwt-config';
import jwtConfig from '../../core/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { MailService } from 'src/common/service/mail/mail.service';
import path, { join } from 'path';
import ejs, { renderFile } from 'ejs';
import { resetPasswordDTO } from './dto/auth';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    @Inject(jwtConfig.KEY)
    private accessTokenConfig: ConfigType<typeof jwtConfig>,
    private mailService: MailService,
  ) {}

  async signUp(data: CreateUserDto): Promise<any> {
    const user = await this.userService.create(data);
    const token = await this.createToken(user);
    const refresh_token = await this.createRefreshToken(user);
    console.log(token, refresh_token);

    return {
      message: 'User SignUp Successfully',
      access_token: token.access_token,
      refresh_token: refresh_token.refreshToken,
      user: user,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: User) {
    const token = await this.createToken(user);
    const refresh_token = await this.createRefreshToken(user);
    return {
      message: 'User SignIn Successfully',
      access_token: token.access_token,
      refresh_token: refresh_token.refreshToken,
      user: user,
    };
  }

  private async createToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(
      payload,
      this.accessTokenConfig,
    );
    return { access_token };
  }

  async createRefreshToken(user: User): Promise<{ refreshToken: string }> {
    const payload = { sub: user.id, email: user.email };
    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.refreshTokenConfig,
    );
    return { refreshToken };
  }

  async validateGoogleUser(googleUser: CreateUserDto): Promise<User> {
    console.log('email:' + googleUser.email);
    if (!googleUser.email) {
      console.error('No email provided');
      throw new Error('Please provide a valid email');
    }
    const user = await this.userService.findByEmail(googleUser.email);
    console.log(user);
    if (user) return user;
    const createUser = await this.userService.create(googleUser);
    console.log(createUser);
    return createUser;
  }

  async forgetPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const resetToken = await this.userService.resetPasswordToken(user.id);
    console.log('token' + resetToken.passwordResetToken);
    const url = process.env.FRONTEND_URL;
    const resetUrl = `${url}/reset-password?token=${resetToken.passwordResetToken}`;

    const html = await renderFile(
      join(__dirname, '..', '..', 'views', 'forget-password.ejs'), // Adjust path to the views folder inside src
      { getUserName: user.name, resetUrl: resetUrl }, // Data to be injected into the template
    );

    try {
      const SendMail = await this.mailService.sendEmail(
        user.email,
        'Reset Password',
        html,
      );
      console.log(SendMail);
      return SendMail;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to send email');
    }
  }
  
  async resetPassword(resetPasswordDTO: resetPasswordDTO) {
    const updatePassword = await this.userService.updatePassword(
      resetPasswordDTO.token,
      resetPasswordDTO.password,
    );
    return updatePassword;
  }
}
