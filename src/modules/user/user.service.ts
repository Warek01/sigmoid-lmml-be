import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { hash } from 'bcryptjs'

import { User } from './user.entity'
import { RegisterDto } from '@/dto/register.dto'
import { UserRole } from '@/modules/user/user-role.enum'
import { PaginatedRequestDto } from '@/dto/paginated-request.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findOne(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id })
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({ email })
  }

  async create(dto: RegisterDto): Promise<User> {
    const user = new User()

    user.email = dto.email
    user.username = dto.username
    user.password = await hash(dto.password, 13)
    user.createdAt = new Date()
    user.role = UserRole.User

    return this.userRepo.save(user)
  }

  async delete(user: User): Promise<User> {
    return this.userRepo.remove(user)
  }

  async get(query: PaginatedRequestDto): Promise<[User[], number]> {
    return this.userRepo.findAndCount({
      take: query.limit,
      skip: query.offset,
    })
  }

  async exists(id: number): Promise<boolean> {
    return this.userRepo.existsBy({ id })
  }

  async existsEmail(email: string): Promise<boolean> {
    return this.userRepo.existsBy({ email })
  }
}
