import { type Announcement } from '@/entities/announcement';
import { Skeleton } from '@/shared/ui/skeleton';
import { Link } from 'react-router';

type Props = {
  announcement: Announcement;
};

function AnnouncementItem({ announcement }: Props) {
  return (
    <Link
      to={`/announcements/${announcement.id}`}
      className="flex items-center justify-between border-b border-[#d4d4d4] px-8 py-6"
    >
      <h3 className="text-[16px] font-medium text-[#333333]">
        {announcement.title}
      </h3>
      <time className="text-[16px] font-medium text-[#333333]">
        {announcement.createdAt}
      </time>
    </Link>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-between border-b border-[#d4d4d4] px-8 py-6">
      <Skeleton className="h-6 w-52" />
      <Skeleton className="h-6 w-24" />
    </div>
  );
}

AnnouncementItem.Loading = Loading;

export { AnnouncementItem };
