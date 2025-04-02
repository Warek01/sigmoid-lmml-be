import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { TaskService } from './task.service'
import { GetTasksDto } from '@/dto/get-tasks.dto'
import { PaginatedRequestDto } from '@/dto/paginated-request.dto'
import { CreateTaskDto } from '@/dto/create-task.dto'
import { TaskDto } from '@/dto/task.dto'
import { Public } from '@/modules/auth/auth.decorator'
import { Role } from '@/modules/auth/roles.decorator'
import { UserRole } from '@/modules/user/user-role.enum'

@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':country')
  @ApiOperation({})
  @ApiOkResponse({ type: TaskDto })
  @ApiNotFoundResponse()
  @Public()
  async findTask(@Param('country') country: string): Promise<TaskDto> {
    const task = await this.taskService.find(country)
    if (!task) {
      throw new NotFoundException()
    }
    return plainToInstance(TaskDto, task)
  }

  @Get()
  @ApiOperation({})
  @ApiOkResponse({ type: GetTasksDto })
  @Public()
  async getTasks(@Query() query: PaginatedRequestDto): Promise<GetTasksDto> {
    const [tasks, totalTasks] = await this.taskService.get(query)
    return plainToInstance(GetTasksDto, {
      items: tasks,
      totalItems: totalTasks,
    } satisfies GetTasksDto)
  }

  @Post()
  @ApiOperation({})
  @ApiOkResponse({ type: TaskDto })
  @Role(UserRole.Admin)
  async createTask(@Body() dto: CreateTaskDto): Promise<TaskDto> {
    const task = await this.taskService.create(dto)
    return plainToInstance(TaskDto, task)
  }

  @Delete(':country')
  @ApiOperation({})
  @ApiOkResponse({ type: TaskDto })
  @Role(UserRole.Admin)
  async deleteTask(@Param('country') country: string): Promise<TaskDto> {
    const task = await this.taskService.find(country)
    if (!task) {
      throw new NotFoundException()
    }
    await this.taskService.delete(task)
    return plainToInstance(TaskDto, task)
  }
}
