import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit(): Promise<void> {
    try {
      if (this.dataSource.isInitialized) {
        console.log('Database already initialized.');
        return;
      } else {
        await this.dataSource.initialize();
        console.log('Connected to the database successfully.');
      }
    } catch (error) {
      console.error('Failed to initialize database:', error);
      process.exit(1);
    }
  }
}
