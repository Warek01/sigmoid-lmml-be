import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { UserRole } from '@/modules/user/user-role.enum'
import { DecodedJwt } from '@/modules/auth/auth.types'
import { ROLE_METADATA_KEY, RoleHierarchy } from '@/modules/auth/auth.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(
      ROLE_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!requiredRole) {
      return true
    }

    const user = context.switchToHttp().getRequest().user

    if (!user) {
      return false
    }

    const { role }: DecodedJwt = user
    const roleIndex = RoleHierarchy.indexOf(role)
    const requiredRoleIndex = RoleHierarchy.indexOf(requiredRole)
    return roleIndex >= requiredRoleIndex
  }
}
