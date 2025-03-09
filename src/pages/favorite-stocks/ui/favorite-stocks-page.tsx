import { useUser } from '@/app/providers/user-provider';
import { Tab, Tabs } from '@/shared/ui';
import { EllipsisVertical, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';

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
          <img
            src={user.profileImage}
            alt="프로필 사진"
            className="h-[100px] w-[100px] rounded-full"
          />
          <div className="text-[16px] font-bold text-[#333333]">
            {user.nickname}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]">
            <Heart className="mr-2 h-6 w-6" />
            <span className="mr-2 text-[16px] font-bold text-[#6e6e6e]">1</span>
            <span className="mr-2 text-[16px] font-bold text-[#333333]">
              피엔케이피부임상연구센타피엔케이피부임
            </span>
            <span className="flex-1 text-[16px] font-bold text-[#333333]">
              (1234567)
            </span>
            <EllipsisVertical />
          </div>
          <div className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]">
            <Heart className="mr-2 h-6 w-6" />
            <span className="mr-2 text-[16px] font-bold text-[#6e6e6e]">1</span>
            <span className="mr-2 text-[16px] font-bold text-[#333333]">
              피엔케이피부임상연구센타피엔케이피부임
            </span>
            <span className="flex-1 text-[16px] font-bold text-[#333333]">
              (1234567)
            </span>
            <EllipsisVertical />
          </div>
          <div className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]">
            <Heart className="mr-2 h-6 w-6" />
            <span className="mr-2 text-[16px] font-bold text-[#6e6e6e]">1</span>
            <span className="mr-2 text-[16px] font-bold text-[#333333]">
              피엔케이피부임상연구센타피엔케이피부임
            </span>
            <span className="flex-1 text-[16px] font-bold text-[#333333]">
              (1234567)
            </span>
            <EllipsisVertical />
          </div>
          <div className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]">
            <Heart className="mr-2 h-6 w-6" />
            <span className="mr-2 text-[16px] font-bold text-[#6e6e6e]">1</span>
            <span className="mr-2 text-[16px] font-bold text-[#333333]">
              피엔케이피부임상연구센타피엔케이피부임
            </span>
            <span className="flex-1 text-[16px] font-bold text-[#333333]">
              (1234567)
            </span>
            <EllipsisVertical />
          </div>
          <div className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]">
            <Heart className="mr-2 h-6 w-6" />
            <span className="mr-2 text-[16px] font-bold text-[#6e6e6e]">1</span>
            <span className="mr-2 text-[16px] font-bold text-[#333333]">
              피엔케이피부임상연구센타피엔케이피부임
            </span>
            <span className="flex-1 text-[16px] font-bold text-[#333333]">
              (1234567)
            </span>
            <EllipsisVertical />
          </div>
          <div className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]">
            <Heart className="mr-2 h-6 w-6" />
            <span className="mr-2 text-[16px] font-bold text-[#6e6e6e]">1</span>
            <span className="mr-2 text-[16px] font-bold text-[#333333]">
              피엔케이피부임상연구센타피엔케이피부임
            </span>
            <span className="flex-1 text-[16px] font-bold text-[#333333]">
              (1234567)
            </span>
            <EllipsisVertical />
          </div>
          <div className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]">
            <Heart className="mr-2 h-6 w-6" />
            <span className="mr-2 text-[16px] font-bold text-[#6e6e6e]">1</span>
            <span className="mr-2 text-[16px] font-bold text-[#333333]">
              피엔케이피부임상연구센타피엔케이피부임
            </span>
            <span className="flex-1 text-[16px] font-bold text-[#333333]">
              (1234567)
            </span>
            <EllipsisVertical />
          </div>
          <div className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]">
            <Heart className="mr-2 h-6 w-6" />
            <span className="mr-2 text-[16px] font-bold text-[#6e6e6e]">1</span>
            <span className="mr-2 text-[16px] font-bold text-[#333333]">
              피엔케이피부임상연구센타피엔케이피부임
            </span>
            <span className="flex-1 text-[16px] font-bold text-[#333333]">
              (1234567)
            </span>
            <EllipsisVertical />
          </div>
          <div className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]">
            <Heart className="mr-2 h-6 w-6" />
            <span className="mr-2 text-[16px] font-bold text-[#6e6e6e]">1</span>
            <span className="mr-2 text-[16px] font-bold text-[#333333]">
              피엔케이피부임상연구센타피엔케이피부임
            </span>
            <span className="flex-1 text-[16px] font-bold text-[#333333]">
              (1234567)
            </span>
            <EllipsisVertical />
          </div>
        </div>
      </div>
    </div>
  );
}
