import { Controller, Post, Body } from '@nestjs/common';
import { UserReqDto } from 'src/dto/userReq.dto';
import { Auth } from './auth';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: Auth) {}
  @Post()
  register(@Body() body: UserReqDto) {
    
  }
}
