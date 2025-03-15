import { CommentItem } from './comment-item';
import { CommentForm } from './comment-form';
import { Profile } from '../../../shared/ui/profile';
import { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

type Comment = {
  id: number;
  username: string;
  comment: string;
  createdAt: string;
};

export function Community() {
  const username: string = 'user';
  const [comments, setComments] = useState<Comment[]>([]);
  const [nextId, setNextId] = useState(1);
  const [sort, setSort] = useState<'최신순' | '인기순'>('최신순');

  const handleSortBtnClick = () => {
    setSort((prev) => (prev === '인기순' ? '최신순' : '인기순'));
  };

  const handleAddComment = (content: string) => {
    setComments((prev) => [
      ...prev,
      {
        id: nextId,
        username: 'user',
        comment: content,
        createdAt: new Date().toISOString(),
      },
    ]);
    setNextId((prev) => prev + 1);
  };

  const handleEditComment = (id: number, newContent: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, comment: newContent } : comment
      )
    );
  };

  const handleDeleteComment = (id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
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
        <ul className="flex flex-col gap-5">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              content={comment.comment}
              onEdit={(newContent) => handleEditComment(comment.id, newContent)}
              onDelete={() => handleDeleteComment(comment.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
