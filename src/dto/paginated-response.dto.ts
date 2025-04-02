import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export abstract class PaginatedResponseDto<T> {
  abstract items: T[]

  @Expose()
  @ApiProperty({ type: Number })
  totalItems: number
}
