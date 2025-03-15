import { useState } from 'react';
import { CommentBase } from './comment-base';

type Recomment = {
  id: string;
  username: string;
  recomment: string;
};

type CommentItemProps = {
  content: string;
  onEdit?: (content: string) => void;
  onDelete?: () => void;
};

export function CommentItem({ content, onEdit, onDelete }: CommentItemProps) {
  const username: string = 'user';
  const [recomments, setRecomments] = useState<Recomment[]>([]);

  const handleAddRecomment = (content: string) => {
    setRecomments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        username: 'user',
        recomment: content,
      },
    ]);
  };

  const handleRecommentEdit = (id: string | undefined, newContent: string) => {
    if (!id) return;
    setRecomments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, recomment: newContent } : item
      )
    );
  };

  const handleRecommentDelete = (id: string | undefined) => {
    if (!id) return;
    setRecomments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CommentBase
      username={username}
      content={content}
      onEdit={(_, newContent) => onEdit?.(newContent)}
      onDelete={() => onDelete?.()}
      onAddRecomment={handleAddRecomment}
      recomments={recomments}
      onRecommentEdit={handleRecommentEdit}
      onRecommentDelete={handleRecommentDelete}
    />
  );
}
