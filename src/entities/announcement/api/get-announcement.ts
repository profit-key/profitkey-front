import { httpClient } from '@/shared/api';
import { AnnouncementDetail } from './schema';

export const getAnnouncement = async (
  id: number
): Promise<AnnouncementDetail> => {
  const response = await httpClient.get(`/api/announcement/${id}`);

  return AnnouncementDetail.parse(response);
};
