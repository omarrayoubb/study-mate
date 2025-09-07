import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres' | 'mysql'>('DB_TYPE')!,
        host: configService.get<string>('DB_HOST')!,
        port: configService.get<number>('DB_PORT')!,
        username: configService.get<string>('DB_USERNAME')!,
        password: configService.get<string>('DB_PASSWORD')!,
        database: configService.get<string>('DB')!,
        synchronize: true,
        entities: [User],
        //dropSchema: true,
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
