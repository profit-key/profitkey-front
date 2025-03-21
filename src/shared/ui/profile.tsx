import { Avatar } from './avatar';

type ProfileProps = {
  username?: string;
  imgUrl?: string;
  orientation?: 'horizontal' | 'vertical';
};

export function Profile({
  username,
  orientation = 'horizontal',
  imgUrl,
}: ProfileProps): JSX.Element {
  if (orientation === 'horizontal') {
    return (
      <div className="flex items-center justify-center gap-4">
        <Avatar src={imgUrl} />
        {username && <p className="truncate font-bold">{username}</p>}
      </div>
    );
  }

  return (
    <div className="flex max-w-[128px] flex-col items-center justify-center gap-2">
      <Avatar src={imgUrl} />
      {username && (
        <p className="w-full truncate text-center font-bold">{username}</p>
      )}
    </div>
  );
}
