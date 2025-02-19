import { CommentItem } from './comment-item';
import { CommentForm } from './comment-form';
import { ProfileV } from './profile-v';
import { useState } from 'react';
import switchSort from './switch-sort.svg';

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
      <div className="mt-12 flex flex-col gap-5">
        <div className="flex-none">
          <button
            onClick={handleSortBtnClick}
            className="align-center flex gap-2 rounded-[5px] border-b-[2px] border-[#333333] p-1 shadow-md hover:bg-[#F3F3F3]"
          >
            <img src={switchSort} />
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
