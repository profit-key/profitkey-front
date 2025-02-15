import { type PropsWithChildren } from 'react';
import { ProfileH } from './profile-h.tsx';
import { formatDate } from './date.ts';
import { HeartIcon, CommentIcon } from './icon.tsx';
import { CommentForm } from './comment-form.tsx';
import { useState } from 'react';
import { RecommentItem } from './recomment-item.tsx';

type Recomment = {
  username: string;
  recomment: string;
};

export function CommentItem({ children }: PropsWithChildren) {
  const username: string = 'user';
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [recomments, setRecomments] = useState<Recomment[]>([]);
  const [isRecommentVisible, setIsRecommentVisible] = useState(false);

  function handleLikeButton() {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount((c) => c - 1);
      return;
    }
    setLikeCount((c) => c + 1);
  }

  function handleAddRecomment(content: string) {
    setRecomments((prev) => [
      ...prev,
      {
        username: 'user',
        recomment: content,
      },
    ]);
  }

  return (
    <li className="flex flex-col gap-5">
      <div className="flex flex-col gap-[10px]">
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
            <button
              onClick={() => setIsRecommentVisible(!isRecommentVisible)}
              className="flex gap-2 p-2"
            >
              <CommentIcon className="fill-neutral-300" />
              <span>{recomments.length ? recomments.length : null}</span>
            </button>
          </div>
        </div>
      </div>
      {isRecommentVisible && (
        <div className="flex flex-col gap-5 ps-16">
          {recomments && (
            <div className="recomments-list flex flex-col gap-5">
              {recomments.map(({ username, recomment }, index) => (
                <RecommentItem
                  key={index}
                  username={username}
                  comment={recomment}
                />
              ))}
            </div>
          )}
          <div className="flex items-center justify-center gap-4">
            <div className="m-2 h-9 w-9 rounded-full bg-neutral-200"></div>
            <div className="grow">
              <CommentForm
                rows={1}
                placeholder={`댓글을 남겨보세요`}
                onSubmit={handleAddRecomment}
              />
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
