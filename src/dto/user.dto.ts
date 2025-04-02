import { Exclude, Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { UserRole } from '@/modules/user/user-role.enum'

@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty({ type: Number })
  id: number

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date

  @Expose()
  @ApiProperty({ type: String, enum: UserRole, enumName: 'UserRole' })
  role: UserRole

  @Expose()
  @ApiProperty({ type: String })
  email: string

  @Expose()
  @ApiProperty({ type: String })
  username: string
}
