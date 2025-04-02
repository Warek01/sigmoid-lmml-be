import { Exclude, Expose, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { PaginatedResponseDto } from './paginated-response.dto'
import { TaskDto } from './task.dto'

@Exclude()
export class GetTasksDto extends PaginatedResponseDto<TaskDto> {
  @Expose()
  @ApiProperty({ type: [TaskDto] })
  @Type(() => TaskDto)
  items: TaskDto[]
}
