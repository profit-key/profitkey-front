import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { UserIcon } from '@/shared/ui/icon.tsx';

type ProfileProps = {
  username?: string;
  imgSrc?: string;
  orientation?: 'horizontal' | 'vertical';
};

export function Profile({
  username,
  orientation = 'horizontal',
  imgSrc,
}: ProfileProps): JSX.Element {
  if (orientation === 'horizontal') {
    return (
      <div className="flex items-center justify-center gap-4">
        <Avatar>
          <AvatarImage src={imgSrc || '#'} />
          <AvatarFallback className="bg-neutral-300">
            <UserIcon className="h-4 w-4 fill-neutral-500" />
          </AvatarFallback>
        </Avatar>
        {username && <p className="truncate font-bold">{username}</p>}
      </div>
    );
  }

  return (
    <div className="flex max-w-[128px] flex-col items-center justify-center gap-2">
      <Avatar>
        <AvatarImage src={imgSrc || '#'} />
        <AvatarFallback className="bg-neutral-300">
          <UserIcon className="h-4 w-4 fill-neutral-500" />
        </AvatarFallback>
      </Avatar>
      {username && (
        <p className="w-full truncate text-center font-bold">{username}</p>
      )}
    </div>
  );
}
