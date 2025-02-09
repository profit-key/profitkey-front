import { z } from 'zod';

export const Announcement = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string(),
});
export type Announcement = z.infer<typeof Announcement>;

export const AnnouncementDetail = Announcement.extend({
  content: z.string(),
  published: z.boolean(),
});
export type AnnouncementDetail = z.infer<typeof AnnouncementDetail>;
