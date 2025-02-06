import { useSuspenseQuery } from '@tanstack/react-query';
import { announcementQuries } from '../api/query';
import { AnnouncementItem } from './announcement-item';

export default function AnnouncementList() {
  const { data } = useSuspenseQuery(
    announcementQuries.list({ page: 1, size: 10 })
  );

  return (
    <div className="mt-20 border-b border-t border-[#d4d4d4] p-10">
      {data.announcements.map((announcement) => (
        <AnnouncementItem key={announcement.id} announcement={announcement} />
      ))}
      <div className="flex items-center justify-center gap-8 pt-10">
        {/* NOTE 아이콘 추후 변경 예정 */}
        <span>{'<<'}</span>
        <span className="text-[16px] font-medium text-[#333333]">1</span>
        <span>{'>>'}</span>
      </div>
    </div>
  );
}
