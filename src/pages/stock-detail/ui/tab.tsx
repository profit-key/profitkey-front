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
        'group flex flex-1 justify-center border-b pb-6',
        active
          ? 'border-b-[5px] border-[#333333]'
          : 'border-[#d4d4d4] hover:border-[#FFB400]'
      )}
      onClick={onTabChange}
    >
      <h3
        className={cn(
          'font-bold transition-colors duration-300',
          active
            ? 'text-[#333333]'
            : 'text-[#d4d4d4] group-hover:text-[#FFB400]'
        )}
      >
        {children}
      </h3>
    </button>
  );
}
