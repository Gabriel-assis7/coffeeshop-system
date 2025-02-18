import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './data/env/server';

async function bootstrap() {
  const PORT = env().PORT;
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error starting the server:', errorMessage);
    process.exit(1);
  }
}
void bootstrap();
