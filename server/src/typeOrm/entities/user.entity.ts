import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

const userRole = ['consumer', 'employer', 'admin'] as const;
export type UserRole = (typeof userRole)[number];

const userStatuses = ['active', 'inactive', 'excluded'] as const;
export type UserStatuses = (typeof userStatuses)[number];

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  clerkUserId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  imageUrl: string;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn()
  order: Order[];

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn()
  cart: Cart;

  @Column({
    type: 'enum',
    enum: userRole,
    default: userRole[0],
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: userStatuses,
    default: userStatuses[0],
  })
  status: UserStatuses;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
