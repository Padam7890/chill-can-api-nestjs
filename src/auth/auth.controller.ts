import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { signInDTO } from './dto/auth';
import { UniversalDecorator } from 'src/common/decorators/universal.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @UniversalDecorator({
    summary: 'Sign in Form',
    responseType: signInDTO,
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
}
