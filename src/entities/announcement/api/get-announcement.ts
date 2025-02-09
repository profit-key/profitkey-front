import { httpClient } from '@/shared/api';
import { Announcement } from './schema';

export const getAnnouncement = async (id: number): Promise<Announcement> => {
  const response = await httpClient.get(`/api/announcement/${id}`);

  return Announcement.parse(response);
};
