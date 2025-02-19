import { ProfileH } from './profile-h.tsx';
import { formatDate } from './date.ts';
import { HeartIcon } from './icon.tsx';
import { useState } from 'react';

type Props = {
  username: string;
  comment: string;
};

export function RecommentItem({ username, comment }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeButton = (): void => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount((c) => c - 1);
      return;
    }
    setLikeCount((c) => c + 1);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center gap-[10px]">
        <ProfileH username={username} />
        {formatDate('2025-02-13T16:48:11.338Z')}
      </div>
      <div className="relative ps-16 before:absolute before:left-6 before:top-0 before:h-full before:w-[1px] before:bg-[#333333]">
        <div className="">
          <div className="min-h-[50px] w-full rounded-[5px] bg-[#FFB40033] p-4">
            <p>{comment}</p>
          </div>
          <div className="flex">
            <button onClick={handleLikeButton} className="flex gap-2 p-2">
              {isLiked ? (
                <HeartIcon className="fill-[#D94F70]" />
              ) : (
                <HeartIcon className="fill-neutral-300" />
              )}
              <span>{likeCount ? likeCount : null}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
