import { Link, Outlet } from 'react-router';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b-[1px] border-[#dde1e6] px-4 py-4">
        <div className="flex items-center gap-24">
          <Link to="/">
            <h1 className="text-[24px] font-bold text-[#fbbf24]">ProfitKey</h1>
          </Link>
          <input className="h-14 w-72 rounded-2xl border-[1px] border-[#cfcfcf] px-5 py-4" />
        </div>

        <div className="flex items-center gap-16">
          <div className="flex items-center gap-10">
            <Link
              className="text-[18px] font-medium text-[#36398c]"
              to="/stocks"
            >
              종목분석
            </Link>
            <Link className="text-[18px] font-medium text-[#36398c]" to="/news">
              뉴스
            </Link>
            <Link
              className="text-[18px] font-medium text-[#36398c]"
              to="/community"
            >
              커뮤니티
            </Link>
            <Link
              className="text-[18px] font-medium text-[#36398c]"
              to="/topics"
            >
              공지사항/FAQ
            </Link>
          </div>
          <div>
            <Link
              className="text-[18px] font-medium text-[#36398c]"
              to="/login"
            >
              로그인
            </Link>
          </div>
        </div>
      </header>
      <main className="flex flex-1">
        <Outlet />
      </main>
    </div>
  );
}
