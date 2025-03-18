import { userQueries } from '@/entities/user';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export function CommentList() {
  const { data: comments } = useSuspenseQuery(userQueries.commentList());

  return (
    <div className="flex flex-1 flex-col gap-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex items-center justify-between border-b border-b-[#d4d4d4] px-8 py-6"
        >
          <span>{comment.content}</span>
          <time>{format(comment.createdAt, 'yyyy-MM-dd')}</time>
        </div>
      ))}
    </div>
  );
}
