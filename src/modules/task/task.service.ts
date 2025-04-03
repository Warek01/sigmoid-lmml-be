import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { PaginatedRequestDto } from '@/dto/paginated-request.dto'

import { Task } from './task.entity'
import { CreateTaskDto } from '@/dto/create-task.dto'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  get(query: PaginatedRequestDto): Promise<[Task[], number]> {
    return this.taskRepo.findAndCount({
      relations: {},
      skip: query.offset,
      take: query.limit,
    })
  }

  find(country: string): Promise<Task | null> {
    return this.taskRepo.findOne({
      where: {
        country,
      },
    })
  }

  delete(task: Task): Promise<Task> {
    return this.taskRepo.remove(task)
  }

  create(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepo.create()
    task.country = dto.country
    task.description = dto.description
    task.title = dto.title
    task.createdAt = new Date()
    task.assignmentPoints = dto.assignmentPoints
    return this.taskRepo.save(task)
  }

  complete() {
    // TODO: implement
  }
}
