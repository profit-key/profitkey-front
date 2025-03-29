import { CommentItem } from './comment-item';
import { CommentForm } from './comment-form';
import { Profile } from '@/shared/ui/profile';
import { useEffect, useState } from 'react';
import { ArrowDownUp, Loader2 } from 'lucide-react';
import { communityQueries, commentMutation } from '../../api/query';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useUser } from '@/shared/providers';

export function Community({ stockCode }: { stockCode: string }) {
  const user = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [sort, setSort] = useState<'최신순' | '인기순'>('최신순');

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...communityQueries.list({
      stockCode,
      order: sort === '최신순' ? 'LATEST' : 'POPULAR',
    }),
  });

  const handleSortBtnClick = () => {
    setSort((prev) => (prev === '인기순' ? '최신순' : '인기순'));
  };

  const postComment = useMutation({
    ...commentMutation.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['community', 'all', 'lists', { stockCode }],
      });
    },
  });

  const putComment = useMutation({
    ...commentMutation.put,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['community', 'all', 'lists', { stockCode }],
      });
      alert('댓글이 수정되었습니다.');
    },
  });

  const deleteComment = useMutation({
    ...commentMutation.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['community', 'all', 'lists', { stockCode }],
      });
      alert('댓글이 삭제되었습니다.');
    },
  });

  const handleAddComment = (stockCode: string, content: string) => {
    if (!user) return;

    postComment.mutate({
      stockCode,
      writerId: user.userId,
      parentId: '0',
      content,
    });
  };

  const handleEditComment = (id: string, newContent: string) => {
    if (!user) return;

    putComment.mutate({
      id,
      writerId: user.userId,
      parentId: '0',
      content: newContent,
    });
  };

  const handleDeleteComment = (id: string) => {
    deleteComment.mutate(id);
  };

  const handleFormClick = () => {
    if (!user) {
      if (confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?')) {
        navigate('/login');
      }
    }
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
            onSubmit={(content) => {
              if (!user) return;
              handleAddComment(stockCode, content);
            }}
            onClick={handleFormClick}
            disabled={!user}
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
                stockCode={stockCode}
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
