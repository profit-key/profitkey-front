import { useId, useEffect, useRef } from 'react';

type CommentFormProps = {
  placeholder?: string;
  rows?: number;
  onSubmit?: (content: string) => void;
};

export function CommentForm({
  placeholder,
  rows = 1,
  onSubmit,
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const content = formData.get('content') as string;

    if (content.trim() && onSubmit) {
      onSubmit(content);
      form.reset(); // 폼 초기화
      adjustHeight(); // reset 후 높이 조절 함수 호출
    }
  }

  // Enter 키 처리 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const content = e.currentTarget.value;

      if (content.trim() && onSubmit) {
        onSubmit(content);
        e.currentTarget.form?.reset();
        adjustHeight();
      }
    }
  };

  const postTextAreaId = useId();

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor={postTextAreaId} className="sr-only">
        댓글 작성
      </label>
      <div className="flex items-end rounded-[5px] bg-[#E8E8E8] ring-1 ring-[#E8E8E8] focus-within:ring-2 focus-within:ring-[#FFB400]">
        <textarea
          ref={textareaRef}
          id={postTextAreaId}
          name="content"
          placeholder={placeholder}
          rows={rows}
          onKeyDown={handleKeyDown}
          className="min-h-[50px] w-full resize-none overflow-hidden overscroll-none bg-transparent p-4 focus:outline-none"
        />
        <button
          type="submit"
          className="m-2 h-[36px] flex-none rounded-[5px] border-b border-white bg-[#FFB400] px-4 text-base font-bold text-white hover:bg-[#B86F00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB400]"
        >
          등록
        </button>
      </div>
    </form>
  );
}
