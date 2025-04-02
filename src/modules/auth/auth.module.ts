import { Module } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
