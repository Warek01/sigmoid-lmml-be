import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm'

import { UserRole } from '@/modules/user/user-role.enum'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number = null!

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date = new Date()

  @Column({
    name: 'role',
    enumName: 'user_role',
    enum: UserRole,
    type: 'enum',
    nullable: false,
  })
  role: UserRole = UserRole.User

  @Column({ name: 'email', length: 255, nullable: false, unique: true })
  email: string = null!

  @Column({ name: 'username', length: 255, nullable: false })
  username: string = null!

  @Column({ name: 'password', length: 255, nullable: false })
  password: string = null!
}
