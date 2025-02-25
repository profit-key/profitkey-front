import { type PropsWithChildren } from 'react';
import { cn } from '../lib/utils';

export const Tabs = ({ children }: PropsWithChildren) => {
  return <div className="flex w-full">{children}</div>;
};

type TabProps = {
  selected: boolean;
  onTabChange: () => void;
};

export const Tab = ({
  selected,
  onTabChange,
  children,
}: PropsWithChildren<TabProps>) => {
  return (
    <button
      className={cn(
        'group flex flex-1 justify-center border-b pb-6',
        selected
          ? 'border-b-[5px] border-[#333333]'
          : 'border-[#d4d4d4] hover:border-[#FFB400]'
      )}
      onClick={onTabChange}
    >
      <h2
        className={cn(
          'font-bold transition-colors duration-300',
          selected
            ? 'text-[#333333]'
            : 'text-[#d4d4d4] group-hover:text-[#FFB400]'
        )}
      >
        {children}
      </h2>
    </button>
  );
};
