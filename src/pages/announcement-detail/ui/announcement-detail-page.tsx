import { useParams } from 'react-router';
import { AnnouncementDetail } from './announcement-detail';
import { Suspense } from 'react';

export function AnnouncementDetailPage() {
  const { announcementId } = useParams();

  if (!announcementId) return;

  return (
    <div className="mx-auto mt-[100px] max-w-5xl">
      <h2 className="border-b-[5px] border-[#333333] pb-6 text-[24px] font-bold text-[#333333]">
        공지사항
      </h2>
      <Suspense>
        <AnnouncementDetail announcementId={+announcementId} />
      </Suspense>
    </div>
  );
}
