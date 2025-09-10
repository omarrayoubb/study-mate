import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interface/jwtpayload.interface';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtservice: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: Request = context.switchToHttp().getRequest<Request>();
    const token = this.getToken(ctx);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtservice.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      ctx['user'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private getToken(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
