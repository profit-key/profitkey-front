import { UserRound } from 'lucide-react';
import { cn } from '../lib/utils';

type Props = {
  src?: string;
  className?: string;
  fallbackSize?: number;
};

export function Avatar({ src, className, fallbackSize }: Props) {
  if (!src) {
    return (
      <div
        className={cn(
          'flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#d4d4d4]',
          className
        )}
      >
        <UserRound size={fallbackSize} fill="#6e6e6e" stroke="#6e6e6e" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="프로필 사진"
      className={cn('h-[52px] w-[52px] rounded-full object-cover', className)}
    />
  );
}
