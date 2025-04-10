import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  avatar: z.string().url("URL inválida").optional().or(z.literal('')),
  role: z.enum(['admin', 'user'], { 
    errorMap: () => ({ message: 'Papel deve ser admin ou user' })
  }).default('user'),
  status: z.enum(['active', 'inactive'], { 
    errorMap: () => ({ message: 'Status deve ser active ou inactive' })
  }).default('active'),
});

export const userUpdateSchema = userSchema.partial();
