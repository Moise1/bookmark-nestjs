import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto} from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: AuthDto) { 
    return this.authService.login(body);
  };

  @Post('register')
  register(@Body() body: AuthDto) {
    return this.authService.register(body);
  }
}

