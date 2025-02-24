import { z } from 'zod';

export const User = z.object({
  email: z.string(),
  nickname: z.string(),
  profileImage: z.string(),
  userId: z.number(),
});
export type User = z.infer<typeof User>;
