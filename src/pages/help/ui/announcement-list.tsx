import { useSuspenseQuery } from '@tanstack/react-query';
import { AnnouncementItem } from './announcement-item';
import { useState } from 'react';
import { announcementQuries } from '@/entities/announcement';

function AnnouncementList() {
  const [page, setPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(0);
  const { data } = useSuspenseQuery(
    announcementQuries.list({ page, size: 10 })
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageGroupChange = (direction: 'prev' | 'next') => {
    setCurrentPageGroup((prev) => (direction === 'next' ? prev + 1 : prev - 1));
  };

  const totalPages = data.pagination.totalPages;
  const pagesPerGroup = 10;
  const startPage = currentPageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  return (
    <div className="mt-6 border-b border-[#d4d4d4] pb-6">
      {data.announcements.map((announcement) => (
        <AnnouncementItem key={announcement.id} announcement={announcement} />
      ))}
      <div className="flex items-center justify-center gap-8 pt-10">
        {currentPageGroup > 0 && (
          <span onClick={() => handlePageGroupChange('prev')}>{'<<'}</span>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            className={`text-[16px] font-medium ${page === startPage + index ? 'text-[#333333]' : 'text-[#999999]'}`}
            onClick={() => handlePageChange(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
        {endPage < totalPages && (
          <span onClick={() => handlePageGroupChange('next')}>{'>>'}</span>
        )}
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="mt-6 border-b border-[#d4d4d4]">
      <AnnouncementItem.Loading />
      <AnnouncementItem.Loading />
      <AnnouncementItem.Loading />
      <AnnouncementItem.Loading />
      <AnnouncementItem.Loading />
      <AnnouncementItem.Loading />
      <AnnouncementItem.Loading />
      <AnnouncementItem.Loading />
      <AnnouncementItem.Loading />
      <AnnouncementItem.Loading />
    </div>
  );
}

AnnouncementList.Loading = Loading;

export { AnnouncementList };
