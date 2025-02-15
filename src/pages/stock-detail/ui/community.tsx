import { CommentItem } from './comment-item';
import { CommentForm } from './comment-form';
import { ProfileV } from './profile-v';
import { useState } from 'react';

type Comment = {
  username: string;
  comment: string;
};

export function Community() {
  const username: string = 'user';
  const [comments, setComments] = useState<Comment[]>([]);

  function handleAddComment(content: string) {
    setComments((prev) => [
      ...prev,
      {
        username: 'user',
        comment: content,
      },
    ]);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-start gap-5">
        <div className="flex-none">
          <ProfileV username={username} />
        </div>
        <div className="grow">
          <CommentForm
            rows={2}
            placeholder={`${username}님\n댓글을 남겨보세요`}
            onSubmit={handleAddComment}
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col">
        <ul className="flex flex-col gap-5">
          {comments.map((comment) => (
            <CommentItem key={comment.username}>{comment.comment}</CommentItem>
          ))}
        </ul>
      </div>
    </div>
  );
}
