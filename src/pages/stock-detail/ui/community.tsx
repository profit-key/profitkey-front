import { useUser } from '@/app/providers/user-provider';
import { CommentItem } from './comment-item';
import { CommentForm } from './comment-form';
import { Profile } from '@/shared/ui/profile';
import { useEffect, useState } from 'react';
import { ArrowDownUp, Loader2 } from 'lucide-react';
import { communityQueries } from '../api/query';
import { useInfiniteQuery } from '@tanstack/react-query';

export function Community({ stockCode }: { stockCode: string }) {
  const user = useUser();

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...communityQueries.list({ stockCode }),
  });
  const [sort, setSort] = useState<'최신순' | '인기순'>('최신순');

  const handleSortBtnClick = () => {
    setSort((prev) => (prev === '인기순' ? '최신순' : '인기순'));
  };

  const handleAddComment = (content: string) => {
    // 댓글 추가 로직은 API 연동 후 구현
    console.log('댓글 추가:', { content, user });
  };

  const handleEditComment = (id: string, newContent: string) => {
    // 댓글 수정 로직은 API 연동 후 구현
    console.log('댓글 수정:', id, newContent);
  };

  const handleDeleteComment = (id: string) => {
    // 댓글 삭제 로직은 API 연동 후 구현
    console.log('댓글 삭제:', id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollHeight - scrollTop <= clientHeight * 1.2 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-start gap-5">
        <div className="flex-none">
          <Profile
            username={user ? user.nickname : ''}
            imgUrl={user ? user.profileImage : ''}
            orientation="vertical"
          />
        </div>
        <div className="grow">
          <CommentForm
            rows={2}
            placeholder={
              user
                ? `${user.nickname}님\n댓글을 남겨보세요`
                : '로그인 후 댓글을 작성해보세요'
            }
            onSubmit={handleAddComment}
          />
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-5">
        <div className="flex-none">
          <button
            onClick={handleSortBtnClick}
            className="align-center flex items-center justify-center gap-2 rounded-[2px] border-b-[3px] border-[#333333] p-1 shadow-md hover:bg-[#F3F3F3]"
          >
            <ArrowDownUp className="h-5 w-5" />
            {sort}
          </button>
        </div>
        <ul className="flex flex-col gap-5">
          {comments?.pages.flatMap((page) =>
            page.content.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                user={user ? user : undefined}
                onEdit={(newContent) =>
                  handleEditComment(comment.id, newContent)
                }
                onDelete={() => handleDeleteComment(comment.id)}
              />
            ))
          )}
        </ul>
        {isFetchingNextPage && (
          <div className="my-4 text-center text-gray-500">
            <Loader2 className="mx-auto h-6 w-6 animate-spin" />
          </div>
        )}
        {!hasNextPage && (
          <div className="my-4 text-center text-gray-500">
            댓글을 남겨보세요 :)
          </div>
        )}
      </div>
    </div>
  );
}
