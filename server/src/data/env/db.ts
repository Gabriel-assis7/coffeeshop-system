import { z, ZodError } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const dbCredentials = z.object({
  DB_TYPE: z
    .enum(['postgres', 'mysql', 'sqlite', 'mariadb'])
    .default('postgres'),
  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive().min(1),
  DB_PASSWORD: z.string().min(1),
});

export const envDb = (): z.infer<typeof dbCredentials> => {
  try {
    return dbCredentials.parse(process.env);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ZodError ? error.message : 'Unknown error occurred';
    console.error('Error reading environment variables:', errorMessage);
    process.exit(1);
  }
};
