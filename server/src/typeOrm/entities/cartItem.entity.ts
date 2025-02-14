import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cart: Cart;

  @ManyToOne(() => Product, { eager: true, onDelete: 'SET NULL' })
  product: Product | null;

  @Column()
  quantity: number;

  @Column('decimal', { nullable: false })
  price: number;
}
