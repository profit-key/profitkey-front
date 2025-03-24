import { Profile } from '@/shared/ui/profile.tsx';
import { formatDate } from './date.ts';
import { HeartIcon, CommentIcon } from '@/shared/ui/icon.tsx';
import { CommentForm } from './comment-form.tsx';
import { useState } from 'react';
import { CommentMenu } from './comment-menu';
import { Modal } from './modal';
import { cn } from '@/shared/lib/utils.ts';
import { Loader2 } from 'lucide-react';
import { Comment } from '../api/schema';
import { User } from '@/shared/api/schema.ts';

type CommentBaseProps = {
  comment: Comment;
  user?: User;
  isReply?: boolean;
  onEdit?: (id: string | undefined, newContent: string) => void;
  onDelete?: (id: string) => void;
  onAddReply?: (content: string) => void;
  replies?: Comment[];
  onReplyEdit?: (id: string | undefined, newContent: string) => void;
  onReplyDelete?: (id: string) => void;
  hasMoreReplies?: boolean;
  isFetchingMoreReplies?: boolean;
  onLoadMoreReplies?: () => void;
};

export function CommentBase({
  comment,
  user,
  isReply = false,
  onEdit,
  onDelete,
  onAddReply,
  replies = [],
  onReplyEdit,
  onReplyDelete,
  hasMoreReplies,
  isFetchingMoreReplies,
  onLoadMoreReplies,
}: CommentBaseProps) {
  // 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [content, setContent] = useState(comment.content);

  // 좋아요 버튼 처리
  const handleLikeButton = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount((c) => c - 1);
      return;
    }
    setLikeCount((c) => c + 1);
  };

  // 댓글 수정 제출
  const handleEditSubmit = (newContent: string): void => {
    setContent(newContent);
    setIsEditing(false);
    onEdit?.(comment.id, newContent);
  };

  // 수정 시작
  const handleStartEdit = (): void => {
    setIsEditing(true);
  };

  // 삭제 처리
  const handleDelete = (): void => {
    onDelete?.(comment.id);
  };

  // 삭제 확인
  const confirmDelete = (): void => {
    onDelete?.(comment.id);
    setIsDeleteModalOpen(false);
  };

  // 수정 취소
  const cancelEdit = (): void => {
    setIsEditing(false);
    setContent(comment.content);
  };

  // 대댓글 컨텐츠 렌더링
  const renderContent = () => (
    <>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <CommentForm
            initialValue={content}
            rows={3}
            placeholder="댓글을 수정하세요"
            onSubmit={handleEditSubmit}
            onCancel={cancelEdit}
          />
        </div>
      ) : (
        <>
          <div
            className={cn(
              'min-h-[50px] w-full rounded-[5px] bg-[#FFB40033] p-4',
              isReply ? '' : 'break-words'
            )}
          >
            {isReply ? <p>{content}</p> : content}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <button onClick={handleLikeButton} className="flex gap-2 p-2">
                <HeartIcon
                  className={cn(
                    'fill-neutral-300 hover:fill-[#D94F70]',
                    isLiked ? 'fill-[#D94F70]' : ''
                  )}
                />
                <span>{likeCount ? likeCount : null}</span>
              </button>
              {!isReply && (
                <button
                  onClick={() => setIsReplyVisible(!isReplyVisible)}
                  className="flex gap-2 p-2"
                >
                  <CommentIcon className="fill-neutral-300" />
                  <span>
                    {comment.replieCount ? comment.replieCount : null}
                  </span>
                </button>
              )}
            </div>
            {user?.userId === comment.writerId && (
              <CommentMenu onEdit={handleStartEdit} onDelete={handleDelete} />
            )}
          </div>
        </>
      )}
    </>
  );

  // 대댓글 영역 렌더링
  const renderReplies = () => {
    if (isReply || !onAddReply) return null;

    return (
      isReplyVisible && (
        <div className="flex flex-col gap-5 ps-16">
          {replies && (
            <div className="replies-list flex max-h-[520px] flex-col gap-5 overflow-y-auto pb-1 pr-1">
              {replies.map((reply) => (
                <CommentBase
                  key={reply.id}
                  user={user}
                  comment={reply}
                  isReply={true}
                  onEdit={onReplyEdit}
                  onDelete={onReplyDelete}
                />
              ))}
              {hasMoreReplies && isFetchingMoreReplies && (
                <div className="my-4 text-center text-gray-500">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </div>
              )}
              {hasMoreReplies && (
                <button
                  onClick={onLoadMoreReplies}
                  className="text-center text-sm text-gray-500 hover:text-gray-700"
                  disabled={isFetchingMoreReplies}
                >
                  댓글 더보기
                </button>
              )}
            </div>
          )}
          <div className="flex items-center justify-center gap-4">
            <Profile imgUrl={user?.profileImage} orientation="horizontal" />
            <div className="grow">
              <CommentForm
                rows={1}
                placeholder={
                  user ? `댓글을 남겨보세요` : '로그인 후 댓글을 작성해보세요'
                }
                onSubmit={onAddReply}
              />
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <>
      {isReply ? (
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <Profile
              username={comment.writerNickname}
              imgUrl={comment.writerImageUrl}
              orientation="horizontal"
            />
            {formatDate(comment.createdAt)}
          </div>
          <div
            className={cn(
              'ps-16',
              isReply
                ? 'relative before:absolute before:left-6 before:top-1 before:h-full before:w-[1px] before:bg-neutral-500'
                : ''
            )}
          >
            {renderContent()}
          </div>
        </div>
      ) : (
        <li className="flex flex-col gap-5">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <Profile
                username={comment.writerNickname}
                imgUrl={comment.writerImageUrl}
                orientation="horizontal"
              />
              {formatDate(comment.createdAt)}
            </div>
            <div
              className={cn(
                'ps-16',
                isReply
                  ? 'relative before:absolute before:left-5 before:top-1 before:h-full before:w-[1px] before:bg-neutral-500'
                  : ''
              )}
            >
              {renderContent()}
            </div>
          </div>
          {renderReplies()}
        </li>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="댓글 삭제"
        message="댓글을 삭제하시겠습니까?"
      />
    </>
  );
}
