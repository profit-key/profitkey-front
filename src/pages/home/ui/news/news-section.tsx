import { Link } from 'react-router';
import { NewsItem } from './news-item';

export function NewsSection() {
  return (
    <div className="mx-auto max-w-5xl py-32">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-[40px] font-bold text-[#333333]">
          <span className="text-[#ffb400]">PROFITKEY</span> 뉴스
        </h2>
        <Link
          to="/news"
          className="px-8 py-4 text-[16px] font-bold text-[#343434]"
        >
          기사 더 보기
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-x-5">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <NewsItem key={index} />
        ))}
      </div>
    </div>
  );
}
