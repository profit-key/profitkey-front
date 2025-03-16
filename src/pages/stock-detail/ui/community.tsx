import { CommentItem } from './comment-item';
import { CommentForm } from './comment-form';
import { Profile } from '../../../shared/ui/profile';
import { useState } from 'react';
import { ArrowDownUp, Loader2 } from 'lucide-react';
import { communityQueries } from '../api/query';
import { useInfiniteQuery } from '@tanstack/react-query';

export function Community({ stockCode }: { stockCode: string }) {
  const username: string = 'user';
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
    console.log('댓글 추가:', content);
  };

  const handleEditComment = (id: string, newContent: string) => {
    // 댓글 수정 로직은 API 연동 후 구현
    console.log('댓글 수정:', id, newContent);
  };

  const handleDeleteComment = (id: string) => {
    // 댓글 삭제 로직은 API 연동 후 구현
    console.log('댓글 삭제:', id);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    // 스크롤이 하단에 도달하고 다음 페이지가 있으며 현재 로딩 중이 아닐 때
    if (
      scrollHeight - scrollTop <= clientHeight * 1.2 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-start gap-5">
        <div className="flex-none">
          <Profile username={username} orientation="vertical" />
        </div>
        <div className="grow">
          <CommentForm
            rows={2}
            placeholder={`${username}님\n댓글을 남겨보세요`}
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
        <div className="h-[500px] overflow-y-auto" onScroll={handleScroll}>
          <ul className="flex flex-col gap-5">
            {comments?.pages.flatMap((page) =>
              page.content.map((comment) => (
                <CommentItem
                  key={comment.id}
                  content={comment.content}
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
          {!hasNextPage &&
            comments &&
            comments.pages &&
            comments.pages.length > 0 && (
              <div className="my-4 text-center text-gray-500">
                더 이상 댓글이 없습니다.
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
