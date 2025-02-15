import { type PropsWithChildren } from 'react';
import { ProfileH } from './profile-h';
import { formatDate } from './date.ts';
import { HeartIcon } from './icon.tsx';
import { useState } from 'react';

export function Comment({ children }: PropsWithChildren) {
  const username: string = 'user';
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  function handleLikeButton() {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount((c) => c - 1);
      return;
    }
    setLikeCount((c) => c + 1);
  }

  return (
    <li className="flex flex-col gap-[10px]">
      <div className="flex items-center gap-[10px]">
        <ProfileH username={username} />
        {formatDate('2025-02-13T16:48:11.338Z')}
      </div>
      <div className="ps-16">
        <div className="min-h-[50px] w-full rounded-[5px] bg-[#FFB40033] p-4">
          <p>{children}</p>
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
    </li>
  );
}
