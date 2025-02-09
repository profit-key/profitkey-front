import { announcementQuries } from '@/entities/announcement';
import { useQuery } from '@tanstack/react-query';

export function AnnouncementDetailPage() {
  const { data } = useQuery(announcementQuries.detail(1));

  console.log(data);
  return <div></div>;
}
