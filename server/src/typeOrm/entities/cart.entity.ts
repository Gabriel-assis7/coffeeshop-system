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
import { User } from './user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  cartItem: CartItem[];

  @Column({ default: 0 })
  totalPrice: number;

  @Column({ default: 0 })
  totalQuantity: number;

  recalculateTotal() {
    if (!this.cartItem) return;

    this.totalQuantity = this.cartItem.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    this.totalPrice = this.cartItem.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
