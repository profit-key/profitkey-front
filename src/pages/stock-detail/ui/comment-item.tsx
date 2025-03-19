import { useState } from 'react';
import { CommentBase } from './comment-base';
import { useInfiniteQuery } from '@tanstack/react-query';
import { communityQueries } from '../api/query';

type Reply = {
  id: string;
  username: string;
  reply: string;
};

type CommentItemProps = {
  comment: {
    id: string;
    writerNickname: string;
    likeCount: number;
    replieCount: number;
    content: string;
  };
  user: {
    id: string;
    nickname: string;
    imgUrl: string;
  };
  onEdit?: (content: string) => void;
  onDelete?: () => void;
};

export function CommentItem({
  comment,
  user,
  onEdit,
  onDelete,
}: CommentItemProps) {
  const [localReplies, setLocalReplies] = useState<Reply[]>([]);

  const {
    data: replies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...communityQueries.replyList({ id: comment.id, page: 1 }),
  });

  const handleAddReply = (content: string) => {
    setLocalReplies((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        username: user.nickname,
        reply: content,
      },
    ]);
  };

  const handleReplyEdit = (id: string | undefined, newContent: string) => {
    if (!id) return;
    setLocalReplies((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, reply: newContent } : item
      )
    );
  };

  const handleReplyDelete = (id: string | undefined) => {
    if (!id) return;
    setLocalReplies((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CommentBase
      comment={comment}
      user={user}
      onEdit={(_, newContent) => onEdit?.(newContent)}
      onDelete={() => onDelete?.()}
      onAddReply={handleAddReply}
      replies={
        replies?.pages.flatMap((page) =>
          page.content.map((reply) => ({
            id: reply.id,
            username: reply.writerNickname,
            reply: reply.content,
          }))
        ) || localReplies
      }
      onReplyEdit={handleReplyEdit}
      onReplyDelete={handleReplyDelete}
      hasMoreReplies={hasNextPage}
      isFetchingMoreReplies={isFetchingNextPage}
      onLoadMoreReplies={() => fetchNextPage()}
    />
  );
}
