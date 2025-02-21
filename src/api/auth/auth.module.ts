import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './entities/auth.entity';
import secretKey from '@/config/jwt.config';
@Module({
  imports: [TypeOrmModule.forFeature([Auth]), JwtModule.registerAsync({})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
