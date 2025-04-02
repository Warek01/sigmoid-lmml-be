import { Request } from 'express'

import { DecodedJwt } from '@/modules/auth/auth.types'

export interface AppRequest extends Request {
  user?: DecodedJwt
}
