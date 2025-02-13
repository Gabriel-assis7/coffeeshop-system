import { z } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const envServerCredentials = z.object({
  PORT: z.coerce.number().int().min(1),
});

export const env = (): z.infer<typeof envServerCredentials> => {
  try {
    return envServerCredentials.parse(process.env);
  } catch (error) {
    console.error('Error reading environment variables:', error);
    process.exit(1);
  }
};
