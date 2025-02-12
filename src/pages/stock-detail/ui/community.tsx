import { CommentForm } from './comment-form';
import { ProfileV } from './profile-v';

export function Community() {
  const username: string = 'user';

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
          />
        </div>
      </div>
    </div>
  );
}
