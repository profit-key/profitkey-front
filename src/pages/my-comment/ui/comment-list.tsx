import { userQueries } from '@/entities/user';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

function CommentList() {
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

function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="border-b border-b-[#d4d4d4] px-8 py-6">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="border-b border-b-[#d4d4d4] px-8 py-6">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="border-b border-b-[#d4d4d4] px-8 py-6">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="border-b border-b-[#d4d4d4] px-8 py-6">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="border-b border-b-[#d4d4d4] px-8 py-6">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="border-b border-b-[#d4d4d4] px-8 py-6">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="border-b border-b-[#d4d4d4] px-8 py-6">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="border-b border-b-[#d4d4d4] px-8 py-6">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="border-b border-b-[#d4d4d4] px-8 py-6">
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="border-b border-b-[#d4d4d4] px-8 py-6">
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
}

CommentList.Loading = Loading;

export { CommentList };
