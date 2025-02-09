import { announcementQuries } from '@/entities/announcement';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  announcementId: number;
};

export function AnnouncementDetail({ announcementId }: Props) {
  const { data: announcement } = useSuspenseQuery(
    announcementQuries.detail(announcementId)
  );

  return (
    <div className="border-b border-[#333333] py-20">
      <time className="color-[#333333] block text-right text-[16px] font-bold">
        {announcement.createdAt}
      </time>
      <h2 className="mb-10 text-[24px] font-bold text-[#333333]">
        {announcement.title}
      </h2>
      <p className="text-[16px] font-bold text-[#333333]">
        {announcement.content}
      </p>
    </div>
  );
}
