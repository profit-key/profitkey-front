import { z } from 'zod';
import { httpClient } from '@/shared/api';
import { Announcement } from './schema';

const GetAnnouncementsResponse = z.object({
  announcements: z.array(Announcement),
  pagination: z.object({
    totalPages: z.number(),
    totalElements: z.number(),
    currentPage: z.number(),
  }),
});
type GetAnnouncementsResponse = z.infer<typeof GetAnnouncementsResponse>;

export type GetAnnouncementsRequestParams = {
  page: number;
  size: number;
};

export const getAnnouncements = async (
  params: GetAnnouncementsRequestParams
): Promise<GetAnnouncementsResponse> => {
  const response = await httpClient.get('/api/announcement/list', { params });

  return GetAnnouncementsResponse.parse(response);
};
