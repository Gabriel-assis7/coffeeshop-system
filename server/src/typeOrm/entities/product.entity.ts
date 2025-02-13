import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

const status = ['available', 'out_of_stock'] as const;
type ActiveStatuses = (typeof status)[number];

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: status,
    default: status[0],
  })
  status: ActiveStatuses;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
