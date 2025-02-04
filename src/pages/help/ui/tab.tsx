import { cn } from '@/shared/lib/utils';
import { type PropsWithChildren } from 'react';

type Props = {
  active: boolean;
  onTabChange: () => void;
};

export function Tab({
  children,
  active,
  onTabChange,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(
        'flex flex-1 justify-center border-b pb-6',
        active ? 'border-b-[5px] border-[#333333]' : 'border-[#d4d4d4]'
      )}
      onClick={onTabChange}
    >
      <h2
        className={cn(
          'font-bold transition-colors duration-300',
          active ? 'text-[#333333]' : 'text-[#d4d4d4]'
        )}
      >
        {children}
      </h2>
    </button>
  );
}
