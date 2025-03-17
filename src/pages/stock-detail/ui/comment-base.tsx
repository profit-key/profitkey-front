import { Profile } from '../../../shared/ui/profile.tsx';
import { formatDate } from './date.ts';
import { HeartIcon, CommentIcon } from '@/shared/ui/icon.tsx';
import { CommentForm } from './comment-form.tsx';
import { useState } from 'react';
import { CommentMenu } from './comment-menu';
import { Modal } from './modal';
import { cn } from '@/shared/lib/utils.ts';

type Recomment = {
  id: string;
  username: string;
  recomment: string;
};

type CommentBaseProps = {
  id?: string;
  username: string;
  content: string;
  isRecomment?: boolean;
  onEdit?: (id: string | undefined, newContent: string) => void;
  onDelete?: (id: string | undefined) => void;
  onAddRecomment?: (content: string) => void;
  recomments?: Recomment[];
  onRecommentEdit?: (id: string | undefined, newContent: string) => void;
  onRecommentDelete?: (id: string | undefined) => void;
};

export function CommentBase({
  id,
  username,
  content: initialContent,
  isRecomment = false,
  onEdit,
  onDelete,
  onAddRecomment,
  recomments = [],
  onRecommentEdit,
  onRecommentDelete,
}: CommentBaseProps) {
  // 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isRecommentVisible, setIsRecommentVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [comment, setComment] = useState(initialContent);

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
    setComment(newContent);
    setIsEditing(false);
    onEdit?.(id, newContent);
  };

  // 수정 시작
  const handleStartEdit = (): void => {
    setIsEditing(true);
  };

  // 삭제 처리
  const handleDelete = (): void => {
    onDelete?.(id);
  };

  // 삭제 확인
  const confirmDelete = (): void => {
    onDelete?.(id);
    setIsDeleteModalOpen(false);
  };

  // 수정 취소
  const cancelEdit = (): void => {
    setIsEditing(false);
    setComment(initialContent);
  };

  // 대댓글 컨텐츠 렌더링
  const renderContent = () => (
    <>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <CommentForm
            initialValue={comment}
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
              isRecomment ? '' : 'break-words'
            )}
          >
            {isRecomment ? <p>{comment}</p> : comment}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <button onClick={handleLikeButton} className="flex gap-2 p-2">
                <HeartIcon
                  className={cn(
                    'fill-neutral-300',
                    isLiked ? 'fill-[#D94F70]' : ''
                  )}
                />
                <span>{likeCount ? likeCount : null}</span>
              </button>
              {!isRecomment && (
                <button
                  onClick={() => setIsRecommentVisible(!isRecommentVisible)}
                  className="flex gap-2 p-2"
                >
                  <CommentIcon className="fill-neutral-300" />
                  <span>{recomments.length ? recomments.length : null}</span>
                </button>
              )}
            </div>

            <CommentMenu onEdit={handleStartEdit} onDelete={handleDelete} />
          </div>
        </>
      )}
    </>
  );

  // 대댓글 영역 렌더링
  const renderRecomments = () => {
    if (isRecomment || !onAddRecomment) return null;

    return (
      isRecommentVisible && (
        <div className="flex flex-col gap-5 ps-16">
          {recomments.length > 0 && (
            <div className="recomments-list flex flex-col gap-5">
              {recomments.map(({ id, username, recomment }) => (
                <CommentBase
                  key={id}
                  id={id}
                  username={username}
                  content={recomment}
                  isRecomment={true}
                  onEdit={onRecommentEdit}
                  onDelete={onRecommentDelete}
                />
              ))}
            </div>
          )}
          <div className="flex items-center justify-center gap-4">
            <Profile />
            <div className="grow">
              <CommentForm
                rows={1}
                placeholder={`댓글을 남겨보세요`}
                onSubmit={onAddRecomment}
              />
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <>
      {isRecomment ? (
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <Profile username={username} orientation="horizontal" />
            {formatDate('2025-02-13T16:48:11.338Z')}
          </div>
          <div
            className={cn(
              'ps-16',
              isRecomment
                ? 'relative before:absolute before:left-5 before:top-1 before:h-full before:w-[1px] before:bg-neutral-500'
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
              <Profile username={username} orientation="horizontal" />
              {formatDate('2025-02-13T16:48:11.338Z')}
            </div>
            <div
              className={cn(
                'ps-16',
                isRecomment
                  ? 'relative before:absolute before:left-5 before:top-1 before:h-full before:w-[1px] before:bg-neutral-500'
                  : ''
              )}
            >
              {renderContent()}
            </div>
          </div>
          {renderRecomments()}
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
