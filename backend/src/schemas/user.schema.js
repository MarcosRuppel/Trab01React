import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  avatar: z.string().url({ message: 'Avatar must be a valid URL' }).optional(),
  role: z.enum(['admin', 'user']).default('user'),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const userUpdateSchema = userSchema.partial();
