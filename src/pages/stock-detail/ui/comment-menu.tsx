import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Modal } from './modal';

interface CommentMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function CommentMenu({ onEdit, onDelete }: CommentMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleEdit = () => {
    onEdit();
    setIsMenuOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const confirmDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <EllipsisVertical className="h-6 w-6 rotate-90" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 z-10 mt-2 w-32 rounded-md border-b-[2px] border-[#333333] bg-white shadow-lg ring-1 ring-black/5">
          <div className="py-4">
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleEdit}
            >
              <div className="flex items-center justify-center gap-2 text-base text-[#333333]">
                <Pencil className="h-6 w-6" />
                수정하기
              </div>
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleDeleteClick}
            >
              <div className="flex items-center justify-center gap-2 text-base text-[#333333]">
                <Trash2 className="h-6 w-6" />
                삭제하기
              </div>
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="댓글 삭제"
        message="댓글을 삭제하시겠습니까?"
      />
    </div>
  );
}
