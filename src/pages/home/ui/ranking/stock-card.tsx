import { cn } from '@/shared/lib/utils';
import medal from './medal.png';
import koFlag from './KO.png';
import usFlag from './US.png';
import { Link } from 'react-router';
import { formatNumberWithCommas } from '@/shared/lib/number';

type StockCardProps = {
  rank?: number;
  code?: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
  className?: string;
  nation?: 'ko' | 'us';
};

export const StockCard = ({
  rank,
  code,
  name,
  price,
  change,
  marketCap,
  className,
  nation,
}: StockCardProps) => {
  const getPriceStatus = (change: number) => {
    if (change > 0) return 'up';
    if (change < 0) return 'down';
    return 'neutral';
  };

  const status = getPriceStatus(change);
  const statusStyle = {
    text: {
      up: 'text-red-600',
      down: 'text-blue-600',
      neutral: 'text-gray-600',
    },
    bg: {
      up: 'bg-red-100',
      down: 'bg-blue-100',
      neutral: 'bg-gray-300',
    },
  };

  return (
    <Link
      to={code ? `/stocks/${code}` : '#'}
      className={cn(
        'cursor-pointer rounded-md bg-neutral-100 p-2 transition-all hover:bg-neutral-50',
        className
      )}
    >
      <div className="flex gap-4">
        {rank === 1 && (
          <div className="mx-4 w-16">
            <img src={medal} alt="1등" className="h-full w-full" />
          </div>
        )}
        <div className={cn('flex-1 truncate', rank === 1 && 'text-center')}>
          <div
            className={cn(
              'mb-3 flex items-center gap-3',
              rank === 1 && 'justify-center'
            )}
          >
            {rank && rank !== 1 && (
              <div className="flex-none text-sm font-bold">{`${rank}위`}</div>
            )}
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate font-bold text-gray-800">{name}</h3>
              {nation && (
                <img
                  src={nation === 'ko' ? koFlag : usFlag}
                  alt={name}
                  className="h-5 w-6"
                />
              )}
            </div>
          </div>
          <div
            className={cn(
              'mb-2 flex items-center',
              rank === 1 ? 'justify-center gap-4' : 'justify-between'
            )}
          >
            <div className={cn('text-gray-900', statusStyle.text[status])}>
              {formatNumberWithCommas(price)}원
            </div>
            <div
              className={cn(
                'rounded-[5px] px-1 py-0.5 text-xs font-bold',
                statusStyle.bg[status],
                statusStyle.text[status]
              )}
            >
              {status === 'up' ? '+' : ''}
              {change}%
            </div>
          </div>
          <div>{formatNumberWithCommas(marketCap)}원</div>
        </div>
      </div>
    </Link>
  );
};
