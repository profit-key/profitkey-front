import { useUser } from '@/shared/providers';
import { Tab, Tabs } from '@/shared/ui';
import { Avatar } from '@/shared/ui/avatar';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { putUserNickname } from '../api/put-user-nickname';

const tabs = [
  { label: '내 관심종목', path: '/profile/stocks' },
  { label: '내가 쓴 댓글', path: '/profile/comments' },
  { label: '회원정보수정', path: '/profile/my' },
];

export function Mypage() {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [nickname, setNickname] = useState(user?.nickname);
  const { mutate, isPending } = useMutation({
    mutationFn: (nickname: string) => putUserNickname(nickname),
  });

  const handleLogoutClick = () => {
    localStorage.removeItem('TOKEN');
    navigate('/');
    window.location.reload();
  };

  const handleSubmit = () => {
    if (!nickname || isPending) return;

    mutate(nickname);
  };

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

      <div className="flex justify-around pt-16">
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

        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <label className="text-[24px] font-bold text-[#333333]">
              닉네임 변경
            </label>
            <div>
              <input
                value={nickname}
                placeholder="닉네임 입력(최대 10자까지 가능)"
                maxLength={10}
                className="h-9 w-80 rounded-md border-b border-[#333333] bg-[#d4d4d4] px-4"
                onChange={(e) => setNickname(e.target.value)}
              />
              <button
                className="ml-4 h-9 w-16 rounded-md border border-[#ffffff] bg-[#ffb400]"
                onClick={handleSubmit}
              >
                등록
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <label className="text-[24px] font-bold text-[#333333]">
              이메일 주소
            </label>
            <input
              value={user.email}
              className="h-9 w-80 rounded-md border-b border-[#333333] bg-[#d4d4d4] px-4"
            />
          </div>
        </form>
      </div>

      <div className="mt-11 flex flex-col items-end gap-10">
        <button
          onClick={handleLogoutClick}
          type="button"
          className="rounded-md px-4 py-2 text-[16px] font-bold text-[#333333] shadow-lg"
        >
          로그아웃
        </button>
        <button
          type="button"
          className="rounded-md px-4 py-2 text-[16px] font-bold text-[#333333] shadow-lg"
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
