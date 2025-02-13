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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, Product, Category]),
    UserModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
