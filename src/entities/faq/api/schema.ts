import { z } from 'zod';

export const FAQ = z.object({
  id: z.number(),
  title: z.string(),
  question: z.string(),
});
export type FAQ = z.infer<typeof FAQ>;
