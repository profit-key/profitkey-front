import { useUser } from '@/shared/providers';
import { Modal, Tab, Tabs } from '@/shared/ui';
import { Avatar } from '@/shared/ui/avatar';
import { useLocation, useNavigate } from 'react-router';

import { overlay } from 'overlay-kit';
import { UserForm } from './user-form';

const tabs = [
  { label: '내 관심종목', path: '/profile/stocks' },
  { label: '내가 쓴 댓글', path: '/profile/comments' },
  { label: '회원정보수정', path: '/profile/my' },
];

export function Mypage() {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    localStorage.removeItem('TOKEN');
    navigate('/');
    window.location.reload();
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

        <UserForm user={user} />
      </div>

      <div className="mt-11 flex flex-col items-end gap-10">
        <button
          onClick={() => {
            overlay.open(({ isOpen, close }) => {
              return (
                <Modal open={isOpen} onClose={close}>
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-base font-bold text-[#333333]">
                      로그아웃 하시겠습니까?
                    </h3>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={close}
                        className="p-2 text-base font-bold text-[#333]"
                      >
                        취소
                      </button>
                      <button
                        onClick={handleLogoutClick}
                        className="rounded-md bg-[#FFB400] p-2 text-base font-bold text-white"
                      >
                        로그아웃
                      </button>
                    </div>
                  </div>
                </Modal>
              );
            });
          }}
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
