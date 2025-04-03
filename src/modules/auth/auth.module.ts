import { forwardRef, Global, Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserModule } from '@/modules/user/user.module'

import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { AuthController } from './auth.controller'

@Global()
@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService, JwtService],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
