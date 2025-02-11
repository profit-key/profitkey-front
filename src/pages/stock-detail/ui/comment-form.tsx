import { useId } from 'react';
import './comment-form.css';

export function CommentForm(): JSX.Element {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    // 브라우저 새로고침 방지
    e.preventDefault();

    // form data 읽기
    const form = e.currentTarget;
    const formData = new FormData(form);

    // body에 formData을 넣어 전송 가능:
    // fetch('/some-api', { method: form.method, body: formData });

    // 또는 일반(plain) 객체로 작업 가능
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
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
          placeholder="댓글을 남겨보세요."
          rows={1}
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
