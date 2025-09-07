import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  // change it to email + password --> further step
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
