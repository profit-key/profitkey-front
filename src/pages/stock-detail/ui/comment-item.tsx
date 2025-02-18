import { ProfileH } from './profile-h.tsx';
import { formatDate } from './date.ts';
import { HeartIcon, CommentIcon } from './icon.tsx';
import { CommentForm } from './comment-form.tsx';
import { useState } from 'react';
import { RecommentItem } from './recomment-item.tsx';
import { Modal } from './modal';
import dotsMenu from './dots-menu.svg';
import editIcon from './edit.svg';
import deleteIcon from './trash.svg';

type Recomment = {
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
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [recomments, setRecomments] = useState<Recomment[]>([]);
  const [isRecommentVisible, setIsRecommentVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [comment, setComment] = useState(content);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleLikeButton() {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount((c) => c - 1);
      return;
    }
    setLikeCount((c) => c + 1);
  }

  function handleAddRecomment(content: string) {
    setRecomments((prev) => [
      ...prev,
      {
        username: 'user',
        recomment: content,
      },
    ]);
  }

  function handleEditSubmit(newContent: string): void {
    setComment(newContent);
    setIsEditing(false);
    onEdit?.(newContent);
  }

  function confirmDelete(): void {
    onDelete?.();
    setIsDeleteModalOpen(false);
  }

  function cancelEdit() {
    setIsEditing(false);
    setComment(content);
  }

  return (
    <>
      <li className="flex flex-col gap-5">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <ProfileH username={username} />
            {formatDate('2025-02-13T16:48:11.338Z')}
          </div>
          <div className="ps-16">
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
                <div className="min-h-[50px] w-full break-words rounded-[5px] bg-[#FFB40033] p-4">
                  {comment}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <button
                      onClick={handleLikeButton}
                      className="flex gap-2 p-2"
                    >
                      {isLiked ? (
                        <HeartIcon className="fill-[#D94F70]" />
                      ) : (
                        <HeartIcon className="fill-neutral-300" />
                      )}
                      <span>{likeCount ? likeCount : null}</span>
                    </button>
                    <button
                      onClick={() => setIsRecommentVisible(!isRecommentVisible)}
                      className="flex gap-2 p-2"
                    >
                      <CommentIcon className="fill-neutral-300" />
                      <span>
                        {recomments.length ? recomments.length : null}
                      </span>
                    </button>
                  </div>

                  <div className="relative">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <img src={dotsMenu} alt="메뉴" />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 z-10 mt-2 w-32 rounded-md border-b-[2px] border-[#333333] bg-white shadow-lg ring-1 ring-black/5">
                        <div className="py-4">
                          <button
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setIsEditing(true);
                              setIsMenuOpen(false);
                            }}
                          >
                            <div className="flex items-center justify-center gap-2 text-base text-[#333333]">
                              <img
                                src={editIcon}
                                alt="수정하기"
                                className="h-6 w-6"
                              />
                              수정하기
                            </div>
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setIsDeleteModalOpen(true);
                              setIsMenuOpen(false);
                            }}
                          >
                            <div className="flex items-center justify-center gap-2 text-base text-[#333333]">
                              <img
                                src={deleteIcon}
                                alt="삭제하기"
                                className="h-6 w-6"
                              />
                              삭제하기
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {isRecommentVisible && (
          <div className="flex flex-col gap-5 ps-16">
            {recomments && (
              <div className="recomments-list flex flex-col gap-5">
                {recomments.map(({ username, recomment }, index) => (
                  <RecommentItem
                    key={index}
                    username={username}
                    comment={recomment}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center justify-center gap-4">
              <div className="m-2 h-9 w-9 rounded-full bg-neutral-200"></div>
              <div className="grow">
                <CommentForm
                  rows={1}
                  placeholder={`댓글을 남겨보세요`}
                  onSubmit={handleAddRecomment}
                />
              </div>
            </div>
          </div>
        )}
      </li>

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
