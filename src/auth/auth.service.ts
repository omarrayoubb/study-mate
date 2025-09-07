import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserReqDto } from 'src/dto/userReq.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  hashSalt = 10;
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.hashSalt);
    return hash;
  }
  async comparePassword(username: string, password: string) {
    const userPassword = await this.userService.getPassword(username);
    console.log(userPassword);
    const checkPassword = await bcrypt.compare(password, userPassword);
    if (checkPassword) return;
    throw new UnauthorizedException('Incorrect username  or password'); //change that message
  }
  // need to remove the userData when return as we want it to register and log in afterwards
  async createUser(userData: UserReqDto) {
    const { email, password, username } = userData;
    await this.userService.verifyUserExistence(username, email);
    const hashedPass = await this.hashPassword(password);
    userData.password = hashedPass;
    await this.userService.createUser(userData);
    return {
      message: 'User has signed up successfully',
      userData,
    };
  }

  async loginUser(loginData: LoginDto) {
    const { username, password } = loginData; // rename after change to email and password
    console.log(password);
    await this.comparePassword(username, password);
    const userData = await this.userService.findOne(username);
    console.log(userData);

    const token = await this.jwtService.signAsync(userData);
    return {
      token,
      message: 'User logged in Successfully',
      tokentype: 'Bearer',
      userData,
    };

    // continue here
  }
}
