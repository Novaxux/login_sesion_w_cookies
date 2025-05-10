import z from 'zod';

const userSchema = z.object({
  username: z.string().min(6).max(20),
  password: z.string().min(6).max(20),
});

export default userSchema;
