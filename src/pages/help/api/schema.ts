import { z } from 'zod';

export const FAQ = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
  published: z.boolean(),
  createdAt: z.string(),
});
export type FAQ = z.infer<typeof FAQ>;
