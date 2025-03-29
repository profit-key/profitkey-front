import { userQueries } from '@/entities/user';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { EllipsisVertical, Heart } from 'lucide-react';

function StockList() {
  const { data: stocks } = useSuspenseQuery(userQueries.favoriteStocksList());

  return (
    <div className="flex flex-1 flex-col gap-4">
      {stocks.map((stock, index) => (
        <div
          key={stock.stockCode}
          className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]"
        >
          <Heart className="mr-2 h-6 w-6" fill="#D94F70" stroke="#D94F70" />
          <span className="mr-2 text-[16px] font-bold text-[#6e6e6e]">
            {index + 1}
          </span>
          <span className="mr-2 text-[16px] font-bold text-[#333333]">
            {stock.stockName}
          </span>
          <span className="flex-1 text-[16px] font-bold text-[#333333]">
            {stock.stockCode}
          </span>
          <EllipsisVertical />
        </div>
      ))}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
    </div>
  );
}

StockList.Loading = Loading;

export { StockList };
