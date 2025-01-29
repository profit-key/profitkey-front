import { Link, Outlet } from 'react-router';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-[1px] border-[#dde1e6] py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-24">
          <Link to="/">
            <h1 className="font-bold text-[#fbbf24] text-[24px]">ProfitKey</h1>
          </Link>
          <input className="w-72 h-14 border-[#cfcfcf] border-[1px] rounded-2xl py-4 px-5" />
        </div>

        <div className="flex items-center gap-16">
          <div className="flex items-center gap-10">
            <Link
              className="font-medium text-[#36398c] text-[18px]"
              to="/stocks"
            >
              종목분석
            </Link>
            <Link className="font-medium text-[#36398c] text-[18px]" to="/news">
              뉴스
            </Link>
            <Link
              className="font-medium text-[#36398c] text-[18px]"
              to="/community"
            >
              커뮤니티
            </Link>
            <Link
              className="font-medium text-[#36398c] text-[18px]"
              to="/topics"
            >
              공지사항/FAQ
            </Link>
          </div>
          <div>
            <Link
              className="font-medium text-[#36398c] text-[18px]"
              to="/login"
            >
              로그인
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex">
        <Outlet />
      </main>
    </div>
  );
}
