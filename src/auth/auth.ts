import { Injectable } from '@nestjs/common';
import { UserReqDto } from 'src/dto/userReq.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class Auth {
  constructor(private dataSource: DataSource) {}

  createUser(userData: UserReqDto) {
    this.dataSource.
  }
}
