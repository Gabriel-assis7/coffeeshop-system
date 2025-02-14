import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Cart } from './cart.entity';

const userRole = ['consumer', 'employer', 'admin'] as const;
type UserRole = (typeof userRole)[number];

const activeStatues = ['active', 'inactive'] as const;
type ActiveStatuses = (typeof activeStatues)[number];

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

  @Column({ nullable: false })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: userRole,
    default: userRole[0],
  })
  role: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

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
