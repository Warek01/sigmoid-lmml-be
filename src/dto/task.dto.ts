import { Exclude, Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

@Exclude()
export class TaskDto {
  @Expose()
  @ApiProperty({ type: String })
  country: string

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date

  @Expose()
  @ApiProperty({ type: String })
  description: string

  @Expose()
  @ApiProperty({ type: String })
  title: string

  @Expose()
  @ApiProperty({ type: Number })
  assignmentPoints: number
}
