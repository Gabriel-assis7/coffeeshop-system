import { z, ZodError } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const envServerCredentials = z.object({
  PORT: z.coerce.number().int().min(1),
});

export const env = (): z.infer<typeof envServerCredentials> => {
  try {
    return envServerCredentials.parse(process.env);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof ZodError ? error.message : 'Unknown error occurred';
    console.error(`Error reading environment variables: ${errorMessage}`);
    process.exit(1);
  }
};
