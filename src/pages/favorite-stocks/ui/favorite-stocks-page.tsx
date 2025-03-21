import { useUser } from '@/app/providers/user-provider';
import { Tab, Tabs } from '@/shared/ui';
import { useNavigate } from 'react-router';
import { StockList } from './stock-list';
import { Suspense } from 'react';
import { Avatar } from '@/shared/ui/avatar';

const tabs = [
  { label: '내 관심종목', path: '/profile/stocks' },
  { label: '내가 쓴 댓글', path: '/profile/comments' },
  { label: '회원정보수정', path: '/profile/my' },
];

export function FavoriteStocksPage() {
  const user = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login', { replace: true });
    return;
  }

  return (
    <div className="mx-auto mt-[100px] max-w-5xl">
      <Tabs>
        {tabs.map(({ label, path }) => (
          <Tab
            key={path}
            selected={location.pathname === path}
            onTabChange={() => navigate(path)}
          >
            {label}
          </Tab>
        ))}
      </Tabs>

      <div className="flex items-start justify-around gap-10 px-6 pt-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <Avatar
            src={user.profileImage}
            className="h-[100px] w-[100px]"
            fallbackSize={44}
          />
          <div className="text-[16px] font-bold text-[#333333]">
            {user.nickname}
          </div>
        </div>

        <Suspense fallback={<StockList.Loading />}>
          <StockList />
        </Suspense>
      </div>
    </div>
  );
}
