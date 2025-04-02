import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('tasks')
export class Task {
  @PrimaryColumn({ name: 'country', type: 'varchar' })
  country: string = null!

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date = new Date()

  @Column({ name: 'description', type: 'varchar' })
  description: string = null!

  @Column({ name: 'title', type: 'varchar' })
  title: string = null!

  @Column({ name: 'assignment_points', type: 'int' })
  assignmentPoints: number = null!
}
