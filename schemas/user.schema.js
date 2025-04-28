import z from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
});

export default userSchema;
// const result = userSchema.safeParse({ name: 123, password: '19293' });
// const parsedError =result.error.format()
// console.log(parsedError);
