import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
export class UserReqDto {
  @IsEmail()
  email: string;
  @IsString()
  username: string;
  @IsStrongPassword()
  password: string;
}
