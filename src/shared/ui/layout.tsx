import { Link, Outlet, useNavigate } from 'react-router';
import { Avatar } from './avatar';
import { useUser } from '../providers';
import { ScrollToTop } from '../lib/scroll-to-top';
import { openaiQueries } from '@/entities/openai';
import { useQueryClient } from '@tanstack/react-query';

export function Layout() {
  const queryClient = useQueryClient();
  const user = useUser();
  const navigate = useNavigate();

  const handleStockAnalysisClick = async () => {
    const {
      stockCode: { stockCode },
    } = await queryClient.ensureQueryData(openaiQueries.marketOpinion());

    navigate(`/stocks/${stockCode}`);
  };

  return (
    <>
      <ScrollToTop />
      <header className="border-b border-[#d4d4d4] px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-24">
            <Link to="/">
              <h1 className="text-[24px] font-bold text-[#fbbf24]">
                ProfitKey
              </h1>
            </Link>
            <input className="h-14 w-72 rounded-2xl border-[1px] border-[#cfcfcf] px-5 py-4" />
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
      <main>
        <Outlet />
      </main>
    </>
  );
}
