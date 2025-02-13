import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './data/env/server';

async function bootstrap() {
  const PORT = env().PORT;

  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}
void bootstrap();
