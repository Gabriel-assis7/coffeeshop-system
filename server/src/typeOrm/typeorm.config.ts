import { envDb } from 'src/data/env/db';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: envDb().DB_TYPE as 'postgres',
  host: envDb().DB_HOST,
  port: envDb().DB_PORT,
  username: envDb().DB_USER,
  password: envDb().DB_PASSWORD,
  database: envDb().DB_NAME,
  entities: [__dirname + './entities/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
