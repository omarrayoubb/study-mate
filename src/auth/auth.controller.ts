import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { UserReqDto } from 'src/dto/userReq.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @HttpCode(201)
  async register(@Body() body: UserReqDto) {
    return await this.authService.createUser(body);
  }
  @Get('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.loginUser(body);
  }
}
