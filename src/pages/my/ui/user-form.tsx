import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { putUserNickname } from '../api/put-user-nickname';

type Props = {
  user: {
    email: string;
    nickname: string;
    profileImage: string;
    userId: number;
  };
};

export function UserForm({ user }: Props) {
  const [nickname, setNickname] = useState(user?.nickname);
  const { mutate, isPending } = useMutation({
    mutationFn: (nickname: string) => putUserNickname(nickname),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nickname || isPending) return;

    mutate(nickname);
  };

  return (
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
  );
}
