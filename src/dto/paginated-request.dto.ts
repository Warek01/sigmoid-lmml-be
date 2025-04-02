import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose, Transform } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

@Exclude()
export abstract class PaginatedRequestDto {
  @Expose()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, default: 0 })
  offset: number = 0

  @Expose()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, default: 10 })
  limit: number = 10
}
