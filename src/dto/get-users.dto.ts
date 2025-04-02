import { Exclude, Expose, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { PaginatedResponseDto } from './paginated-response.dto'
import { UserDto } from './user.dto'

@Exclude()
export class GetUsersDto extends PaginatedResponseDto<UserDto> {
  @Expose()
  @ApiProperty({ type: [UserDto] })
  @Type(() => UserDto)
  items: UserDto[]
}
