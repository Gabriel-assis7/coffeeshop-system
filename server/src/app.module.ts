import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeOrm/typeorm.config';
import { User } from './typeOrm/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import { UserModule } from './user/user.module';
import { Product } from './typeOrm/entities/product.entity';
import { Category } from './typeOrm/entities/category.entity';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { Order } from './typeOrm/entities/order.entity';
import { OrderItem } from './typeOrm/entities/orderItem.entity';
import { CartItem } from './typeOrm/entities/cartItem.entity';
import { Cart } from './typeOrm/entities/cart.entity';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([
      User,
      Product,
      Category,
      Order,
      OrderItem,
      Cart,
      CartItem,
    ]),
    UserModule,
    CategoryModule,
    ProductModule,
    CartModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
