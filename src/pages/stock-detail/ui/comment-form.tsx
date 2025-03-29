import { useId, useEffect, useRef } from 'react';

type CommentFormProps = {
  initialValue?: string;
  placeholder?: string;
  rows?: number;
  onSubmit?: (content: string) => void;
  onCancel?: () => void;
  onClick?: () => void;
  disabled?: boolean;
};

export function CommentForm({
  initialValue = '',
  placeholder,
  rows = 1,
  onSubmit,
  onCancel,
  onClick,
  disabled,
}: CommentFormProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // textarea 높이 자동조절 함수
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // textarea 내용 변경시 높이 조절
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // input 이벤트와 reset 이벤트 모두 감지
      textarea.addEventListener('input', adjustHeight);
      textarea.addEventListener('reset', () => {
        textarea.style.height = '50px';
      });

      return () => {
        textarea.removeEventListener('input', adjustHeight);
        textarea.removeEventListener('reset', () => {
          textarea.style.height = '50px';
        });
      };
    }
  }, []);

  // 초기값 설정을 위한 useEffect 추가
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && initialValue) {
      textarea.value = initialValue;
      adjustHeight(); // 초기 높이 조절
    }
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const content = formData.get('content') as string;

    if (content.trim() && onSubmit && !disabled) {
      onSubmit(content);
      form.reset(); // 로그인한 상태일 때만 폼 초기화
      adjustHeight();
    }
  };

  // Enter 키 처리 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const content = e.currentTarget.value;

      if (content.trim() && onSubmit && !disabled) {
        onSubmit(content);
        e.currentTarget.form?.reset();
        adjustHeight();
      }
    }
  };

  const postTextAreaId = useId();

  return (
    <form method="post" onSubmit={handleSubmit} onClick={onClick}>
      <label htmlFor={postTextAreaId} className="sr-only">
        댓글 작성
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex items-end rounded-[5px] bg-[#E8E8E8] ring-1 ring-[#E8E8E8] focus-within:ring-2 focus-within:ring-[#FFB400]">
          <textarea
            ref={textareaRef}
            id={postTextAreaId}
            name="content"
            placeholder={placeholder}
            rows={rows}
            onKeyDown={handleKeyDown}
            defaultValue={initialValue}
            className="min-h-[50px] w-full resize-none overflow-hidden overscroll-none bg-transparent p-4 focus:outline-none"
          />
          <div className="flex w-[84px] flex-none flex-col gap-2 p-2">
            {onCancel ? (
              <>
                <button
                  type="button"
                  onClick={onCancel}
                  className="h-[36px] w-full flex-none rounded-[5px] border-2 border-[#FFB400] px-4 font-bold text-[#FFB400] hover:bg-[#FFB400] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB400]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="h-[36px] w-full flex-none rounded-[5px] border-b border-white bg-[#FFB400] px-4 font-bold text-white hover:bg-[#B86F00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB400]"
                >
                  수정
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="h-[36px] w-full flex-none rounded-[5px] border-b border-white bg-[#FFB400] px-4 font-bold text-white hover:bg-[#B86F00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB400]"
              >
                등록
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
