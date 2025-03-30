import { useUser } from '@/shared/providers';
import { Modal, Tab, Tabs } from '@/shared/ui';
import { Avatar } from '@/shared/ui/avatar';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { putUserNickname } from '../api/put-user-nickname';
import { overlay } from 'overlay-kit';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
              <button className="ml-4 h-9 w-16 rounded-md border border-[#ffffff] bg-[#ffb400]">
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
          onClick={() => {
            overlay.open(({ isOpen, close }) => {
              return (
                <Modal open={isOpen} onClose={close}>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-base font-bold text-[#333333]">
                      회원탈퇴하시겠습니까?
                    </h3>
                    <p className="text-[8px] font-bold text-[#333]">
                      ※ 회원탈퇴 시 보유하신 데이터 및 계정 정보는 복구할 수
                      없습니다.
                    </p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={close}
                        className="p-2 text-base font-bold text-[#333]"
                      >
                        취소
                      </button>
                      <button className="rounded-md bg-[#FFB400] p-2 text-base font-bold text-white">
                        회원탈퇴
                      </button>
                    </div>
                  </div>
                </Modal>
              );
            });
          }}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
