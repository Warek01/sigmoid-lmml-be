import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { AuthGuard } from '@/modules/auth/auth.guard'
import { UserRole } from '@/modules/user/user-role.enum'

export const IS_PUBLIC_DECORATOR_KEY = 'is_public'

export const Public = () =>
  applyDecorators(SetMetadata(IS_PUBLIC_DECORATOR_KEY, true))

export const Authorize = () =>
  applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard))

export const ROLE_METADATA_KEY = 'role'

export const RoleHierarchy = [UserRole.User, UserRole.Admin]

export const Role = (role: UserRole) =>
  applyDecorators(
    SetMetadata(ROLE_METADATA_KEY, role),
    ApiBearerAuth(),
    UseGuards(AuthGuard),
  )
