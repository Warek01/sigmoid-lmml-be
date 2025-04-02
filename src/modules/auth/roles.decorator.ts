import { SetMetadata } from '@nestjs/common'

import { UserRole } from '@/modules/user/user-role.enum'

export const ROLE_METADATA_KEY = 'role'

export const RoleHierarchy = [UserRole.User, UserRole.Admin]

export const Role = (role: UserRole) => SetMetadata(ROLE_METADATA_KEY, role)
