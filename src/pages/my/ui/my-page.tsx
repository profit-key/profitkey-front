import { Tab, Tabs } from '@/shared/ui';
import { useLocation, useNavigate } from 'react-router';

const tabs = [
  { label: '내 관심종목', path: '/profile/stocks' },
  { label: '내가 쓴 댓글', path: '/profile/comments' },
  { label: '회원정보수정', path: '/profile/my' },
];

export function Mypage() {
  const navigate = useNavigate();
  const location = useLocation();

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
    </div>
  );
}
