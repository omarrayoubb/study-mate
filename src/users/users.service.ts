import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReqDto } from 'src/dto/userReq.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userDataSource: Repository<User>,
  ) {}

  async verifyUserExistence(username: string, email: string): Promise<boolean> {
    const total = await this.userDataSource.count({
      where: [{ username: username }, { email: email }],
    });
    if (total > 0) throw new BadRequestException('User already has an account');
    return true;
  }

  async createUser(userData: UserReqDto) {
    const { email, password, username } = userData;
    try {
      const entity = this.userDataSource.create({
        username,
        email,
        password,
      });
      const savedUser = await this.userDataSource.save(entity);
      return savedUser;
    } catch {
      throw new BadRequestException('Failed to create user');
    }
  }

  async getPassword(username: string): Promise<string> {
    const entity = await this.userDataSource.findOne({
      select: { password: true },
      where: { username: username },
    });
    if (entity === null) throw new BadRequestException('User is not found');
    console.log(entity);
    console.log(entity.password);
    return entity.password;
  }

  async findOne(username: string) {
    const entity = await this.userDataSource.findOne({
      select: { username: true, email: true, createdAt: true, id: true },
      where: { username: username },
    });
    if (entity === null) throw new BadRequestException('User is not found');
    const user = entity.username;
    const id = entity.id;
    const createdAt = entity.createdAt;
    const email = entity.email;
    return {
      user,
      id,
      createdAt,
      email,
    };
  }
}
