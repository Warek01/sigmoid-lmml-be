import { Injectable } from '@nestjs/common'
import { compare } from 'bcryptjs'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'

import { DecodedJwt } from '@/modules/auth/auth.types'
import { User } from '@/modules/user/user.entity'
import { ConfigService } from '@nestjs/config'
import { AppEnv } from '@/types/app-env.types'

@Injectable()
export class AuthService {
  private readonly signOptions: JwtSignOptions

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService<AppEnv>,
  ) {
    this.signOptions = {
      secret: config.get('JWT_SECRET'),
      expiresIn: config.get('JWT_TTL'),
      audience: config.get('JWT_AUD'),
      encoding: 'utf-8',
      algorithm: 'HS256',
      allowInsecureKeySizes: false,
    }
  }

  checkPassword(user: User, password: string): Promise<boolean> {
    return compare(password, user.password)
  }

  async createToken(user: User): Promise<string> {
    const payload = {
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    }
    return this.jwtService.signAsync(payload, this.signOptions)
  }

  async validateToken(token: string): Promise<DecodedJwt | null> {
    try {
      return this.jwtService.verifyAsync<DecodedJwt>(token, this.signOptions)
    } catch (err) {
      return null
    }
  }
}
