import { CommentBase } from './comment-base';
import { useInfiniteQuery } from '@tanstack/react-query';
import { communityQueries } from '../api/query';
import { Comment } from '../api/schema';
import { User } from '@/shared/api/schema';

type CommentItemProps = {
  comment: Comment;
  user?: User;
  onEdit?: (content: string) => void;
  onDelete?: () => void;
};

export function CommentItem({
  comment,
  user,
  onEdit,
  onDelete,
}: CommentItemProps) {
  const {
    data: replies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...communityQueries.replyList({ id: comment.id, page: 1 }),
  });

  const handleAddReply = (content: string) => {
    // TODO : 대댓글 추가 로직 구현
    console.log('대댓글 추가:', { content });
  };

  const handleReplyEdit = (id: string | undefined, newContent: string) => {
    if (!id) return;
    // TODO : 대댓글 수정 로직 구현
    console.log('대댓글 수정:', { id, newContent });
  };

  const handleReplyDelete = (id: string | undefined) => {
    if (!id) return;
    // TODO : 대댓글 삭제 로직 구현현
    console.log('대댓글 삭제:', { id });
  };

  return (
    <CommentBase
      comment={comment}
      user={user}
      onEdit={(_, newContent) => onEdit?.(newContent)}
      onDelete={() => onDelete?.()}
      onAddReply={handleAddReply}
      replies={replies?.pages.flatMap((page) => page.content)}
      onReplyEdit={handleReplyEdit}
      onReplyDelete={handleReplyDelete}
      hasMoreReplies={hasNextPage}
      isFetchingMoreReplies={isFetchingNextPage}
      onLoadMoreReplies={() => fetchNextPage()}
    />
  );
}
