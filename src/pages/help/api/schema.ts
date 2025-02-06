import { z } from 'zod';

export const Announcement = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string(),
});
export type Announcement = z.infer<typeof Announcement>;
