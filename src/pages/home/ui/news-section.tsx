import { Link } from 'react-router';

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
      <div className="grid grid-cols-4 gap-x-4">
        <div>
          <img
            src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="mb-4 rounded-md bg-[#d4d4d4]"
          />
          <span className="line-clamp-2 text-[24px] font-bold text-[#333333]">
            "2025년, 주목해야 할 투자 트렌드 TOP 5000000000000000000000"
          </span>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="mb-4 rounded-md bg-[#d4d4d4]"
          />
          <span className="line-clamp-2 text-[24px] font-bold text-[#333333]">
            "2025년, 주목해야 할 투자 트렌드 TOP 5000000000000000000000"
          </span>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="mb-4 rounded-md bg-[#d4d4d4]"
          />
          <span className="line-clamp-2 text-[24px] font-bold text-[#333333]">
            "2025년, 주목해야 할 투자 트렌드 TOP 5000000000000000000000"
          </span>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="mb-4 rounded-md bg-[#d4d4d4]"
          />
          <span className="line-clamp-2 text-[24px] font-bold text-[#333333]">
            "2025년, 주목해야 할 투자 트렌드 TOP 5000000000000000000000"
          </span>
        </div>
      </div>
    </div>
  );
}
