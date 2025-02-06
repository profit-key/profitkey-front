import { Link } from 'react-router';
import { type Announcement } from '../api/schema';

type Props = {
  announcement: Announcement;
};

export function AnnouncementItem({ announcement }: Props) {
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
