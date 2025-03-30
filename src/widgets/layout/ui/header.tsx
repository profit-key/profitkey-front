import { Link, useNavigate } from 'react-router';
import logo from '@/shared/ui/logo.svg';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/shared/providers';
import { openaiQueries } from '@/entities/openai';
import { Avatar } from '@/shared/ui/avatar';
import { useState } from 'react';
import { stockQueries } from '@/entities/stock';

export function Header() {
  const queryClient = useQueryClient();
  const user = useUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { data } = useQuery({
    ...stockQueries.search(query),
    enabled: Boolean(query.length > 0),
  });

  const handleStockAnalysisClick = async () => {
    const {
      stockCode: { stockCode },
    } = await queryClient.ensureQueryData(openaiQueries.marketOpinion());

    navigate(`/stocks/${stockCode}`);
  };

  const handleStockClick = (code: string) => {
    setQuery('');
    navigate(`/stocks/${code}`);
  };

  return (
    <header className="border-b border-[#d4d4d4] px-4 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-24">
          <Link to="/">
            <img src={logo} className="h-10 w-32" />
          </Link>
          <div className="relative">
            <input
              value={query}
              className="h-14 w-72 rounded-2xl border-[1px] border-[#cfcfcf] px-5 py-4"
              onChange={(e) => setQuery(e.target.value)}
            />
            {query.length > 0 && (
              <div className="absolute flex w-full flex-col gap-2 rounded-md border bg-white p-3 shadow-lg">
                {data?.map((stock) => (
                  <button
                    className="rounded-sm p-1 text-start hover:bg-gray-200"
                    onClick={() => handleStockClick(stock.stockCode)}
                  >
                    {stock.stockName}({stock.stockCode})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-16">
          <div className="flex items-center gap-10">
            <button
              className="text-[18px] text-[#333333] transition-all duration-200 hover:text-[#ffb400]"
              onClick={handleStockAnalysisClick}
            >
              종목분석
            </button>
            <Link
              className="text-[18px] text-[#333333] transition-all duration-200 hover:text-[#ffb400]"
              to="/news"
            >
              뉴스
            </Link>
            <Link
              className="text-[18px] text-[#333333] transition-all duration-200 hover:text-[#ffb400]"
              to="/help"
            >
              공지사항/FAQ
            </Link>
          </div>
          <div>
            {user ? (
              <Link to="/profile/stocks">
                <Avatar src={user.profileImage} />
              </Link>
            ) : (
              <Link
                className="px-4 py-2 text-[16px] font-bold text-[#333333]"
                to="/login"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
