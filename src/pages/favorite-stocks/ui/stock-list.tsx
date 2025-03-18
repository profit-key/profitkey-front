import { userQueries } from '@/entities/user';
import { useSuspenseQuery } from '@tanstack/react-query';
import { EllipsisVertical, Heart } from 'lucide-react';

export function StockList() {
  const { data: stocks } = useSuspenseQuery(userQueries.favoriteStocksList());

  return (
    <div className="flex flex-1 flex-col gap-4">
      {stocks.map((stock, index) => (
        <div
          key={stock.stockCode}
          className="flex items-center px-4 py-6 shadow-[0px_2px_8px_0px_#63636333]"
        >
          <Heart className="mr-2 h-6 w-6" />
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
