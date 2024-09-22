import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { signInDTO } from './dto/auth';
import { UniversalDecorator } from '../../common/decorators/universal.decorator';
import { RefreshAuthGuard } from 'src/core/guards/refresh-auth.guard';
import { JwtAuthGuard } from 'src/core/guards/auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @UniversalDecorator({
    summary: 'Sign in Form',
    responseType: signInDTO,
    body: {
      email:{
        type:'string',
        example:"padamthapa@gmail.com"
      },
      password:{
        type:'string',
        example:"padam786"
      },
    }
  })
  async signin(@Body() user: signInDTO): Promise<any> {
    return this.authService.signIn(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @UniversalDecorator({
    summary: 'Register New User',
    responseType: CreateUserDto,
  })
  async signUp(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.signUp(user);
  }

  // Refresh Token endpoint
  @UniversalDecorator({
    summary: 'Register New User',
    responseType: CreateUserDto,
    includeBearerAuth:true
  })

  
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() request) {
    return this.authService.createRefreshToken(request.user.id);
  }
}
