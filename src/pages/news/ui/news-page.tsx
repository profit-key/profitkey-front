import { NewsCard } from './news-card';
import { NewsListItem } from './news-list-item';

export function NewsPage() {
  return (
    <div className="mx-auto mt-[100px] max-w-5xl">
      <h2 className="text-2xl font-bold text-[#000000]">최신뉴스</h2>
      <div className="mt-10 grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <NewsCard key={index} />
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold text-[#000000]">전체뉴스</h2>
      <div className="mt-10 border-b border-t-4 border-[#333333]">
        {Array.from({ length: 10 }).map((_, index) => (
          <NewsListItem key={index} />
        ))}
      </div>
    </div>
  );
}
