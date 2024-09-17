import { Body, Controller , HttpCode, HttpStatus, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { signInDTO } from './dto/auth';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  @ApiOperation({
    summary:"login user"
  })
  @ApiResponse({
    description: "User logged in successfully",
    type: signInDTO,
  })

  async signin( @Body() user:signInDTO):Promise<any> {
    return this.authService.signIn(user);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    type: CreateUserDto,
  })
  async signUp(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.signUp(user);
  }

}
