import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
@Module({
  imports: [JwtModule.register({ global: true }), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
