import { Module } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'

@Module({
  imports: [],
  controllers: [],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
