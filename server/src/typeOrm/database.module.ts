import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
          });
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error: unknown) {
          console.error(
            'Error connecting to the database:',
            error instanceof Error ? error.message : 'Unknown error',
          );
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
