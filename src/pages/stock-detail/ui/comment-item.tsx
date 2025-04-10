import { CommentBase } from './comment-base';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { commentMutation, communityQueries } from '../api/query';
import { Comment } from '../api/schema';
import { type User } from '@/shared/api';

type CommentItemProps = {
  comment: Comment;
  user?: User;
  stockCode: string;
  onEdit: (newContent: string) => void;
  onDelete: () => void;
};

export function CommentItem({
  comment,
  user,
  stockCode,
  onEdit,
  onDelete,
}: CommentItemProps) {
  const queryClient = useQueryClient();

  const {
    data: replies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...communityQueries.replyList({ id: comment.id }),
  });

  const postReply = useMutation({
    ...commentMutation.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['community', 'all', 'replies', { id: comment.id }],
      });
    },
  });

  const putReply = useMutation({
    ...commentMutation.put,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['community', 'all', 'replies', { id: comment.id }],
      });
    },
  });

  const deleteReply = useMutation({
    ...commentMutation.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['community', 'all', 'replies', { id: comment.id }],
      });
    },
  });

  const handleAddReply = (content: string) => {
    if (!user) return;

    postReply.mutate({
      stockCode,
      writerId: user.userId,
      parentId: comment.id,
      content,
    });
  };

  const handleReplyEdit = (id: string | undefined, newContent: string) => {
    if (!user || !id) return;

    putReply.mutate({
      id,
      writerId: user.userId,
      parentId: comment.id,
      content: newContent,
    });
  };

  const handleReplyDelete = (id: string) => {
    if (!id) return;
    deleteReply.mutate(id);
  };

  return (
    <CommentBase
      stockCode={stockCode}
      comment={comment}
      user={user}
      onEdit={(_, newContent) => onEdit(newContent)}
      onDelete={() => onDelete()}
      onAddReply={handleAddReply}
      replies={replies?.pages.flatMap((page) => page.content)}
      onReplyEdit={handleReplyEdit}
      onReplyDelete={(id) => handleReplyDelete(id)}
      hasMoreReplies={hasNextPage}
      isFetchingMoreReplies={isFetchingNextPage}
      onLoadMoreReplies={() => fetchNextPage()}
    />
  );
}
