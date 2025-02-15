import { useId } from 'react';
import './comment-form.css';

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
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const content = formData.get('content') as string;

    if (content.trim() && onSubmit) {
      onSubmit(content);
      form.reset(); // 폼 초기화
    }
  }

  const postTextAreaId = useId();

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor={postTextAreaId} className="sr-only">
        댓글 작성
      </label>
      <div className="flex items-center rounded-[5px] bg-[#E8E8E8] ring-1 ring-[#E8E8E8] focus-within:ring-2 focus-within:ring-[#FFB400]">
        <textarea
          id={postTextAreaId}
          name="content"
          placeholder={placeholder}
          rows={rows}
          className="min-h-[50px] w-full resize-none overflow-auto overscroll-none bg-transparent p-4 focus:outline-none"
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
