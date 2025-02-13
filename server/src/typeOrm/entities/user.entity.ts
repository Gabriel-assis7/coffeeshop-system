import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const userRole = ['consumer', 'employer', 'admin'] as const;
export type UserRole = (typeof userRole)[number];

const activeStatues = ['active', 'inactive'] as const;
export type ActiveStatuses = (typeof activeStatues)[number];

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  clerkUserId: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: userRole,
    default: userRole[0],
    nullable: false,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: activeStatues,
    default: activeStatues[0],
  })
  activeStatus: ActiveStatuses;
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
