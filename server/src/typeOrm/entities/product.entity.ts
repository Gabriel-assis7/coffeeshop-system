import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from './cart-item.entity';
import { OrderItem } from './order-item.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 0 })
  stock: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItem: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItem: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
