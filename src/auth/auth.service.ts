import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { signInDTO } from './dto/auth';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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
    return {
      message:"User SignIn Sucessfully",
      access_token: token.access_token,
      user: user,
    };
  }

  async signUp(data:CreateUserDto):Promise<any>{
    const user = await this.userService.create(data);
    const token = await this.createToken(user);
    return {
      message:"User SignUp Sucessfully",
      access_token: token.access_token,
      user:user
    }
  }

  private async createToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

}
