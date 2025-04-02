import { UserRole } from '@/modules/user/user-role.enum'

export interface DecodedJwt {
  sub: string
  email: string
  role: UserRole
  iat: number
  exp: number
  aud: string
  iss: string
}
