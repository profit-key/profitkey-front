import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import {
  getAnnouncements,
  type GetAnnouncementsRequestParams,
} from './get-announcements';
import { getAnnouncement } from './get-announcement';

export const announcementQuries = {
  all: () => ['announcements', 'all'],
  lists: () => [...announcementQuries.all(), 'lists'],
  list: (params: GetAnnouncementsRequestParams) =>
    queryOptions({
      queryKey: [...announcementQuries.lists(), params],
      queryFn: () => getAnnouncements(params),
      placeholderData: keepPreviousData,
    }),
  details: () => [...announcementQuries.all(), 'details'],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...announcementQuries.details(), id],
      queryFn: () => getAnnouncement(id),
    }),
};
