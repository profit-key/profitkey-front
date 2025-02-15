import { type PropsWithChildren } from 'react';
import { ProfileH } from './profile-h';
import { formatDate } from './date.ts';

export function Comment({ children }: PropsWithChildren) {
  const username: string = 'user';

  return (
    <li className="flex flex-col gap-[10px]">
      <div className="flex items-center gap-[10px]">
        <ProfileH username={username} />
        {formatDate('2025-02-13T16:48:11.338Z')}
      </div>
      <div className="ps-16">
        <div className="min-h-[50px] w-full rounded-[5px] bg-[#FFB40033] p-4">
          <p>{children}</p>
        </div>
      </div>
      <div></div>
    </li>
  );
}
