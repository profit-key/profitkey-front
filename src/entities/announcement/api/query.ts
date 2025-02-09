import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import {
  getAnnouncements,
  type GetAnnouncementsRequestParams,
} from './get-announcements';

export const announcementQuries = {
  all: () => ['announcements', 'all'],
  lists: () => [...announcementQuries.all(), 'lists'],
  list: (params: GetAnnouncementsRequestParams) =>
    queryOptions({
      queryKey: [...announcementQuries.lists(), 'list', params],
      queryFn: () => getAnnouncements(params),
      placeholderData: keepPreviousData,
    }),
};
