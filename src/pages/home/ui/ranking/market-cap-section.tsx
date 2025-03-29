import { StockCard } from './stock-card';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Skeleton } from '@/shared/ui/skeleton';
import { RotateCw } from 'lucide-react';
import { rankQueries } from '../../api/query';

export function MarketCapSection() {
  const {
    data: marketCapRanks,
    isLoading,
    isError,
    refetch,
  } = useSuspenseQuery(rankQueries.list({ division: 'MARKET_CAP' }));

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-5 text-center text-[40px] font-bold text-[#333333]">
          급등주
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="col-span-2 h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (isError || marketCapRanks.length === 0) {
    return (
      <div>
        <h2 className="mb-5 text-center text-[40px] font-bold text-[#333333]">
          급등주
        </h2>
        <div className="flex flex-col items-center justify-center p-4 text-neutral-500">
          <p className="mb-4">데이터를 불러오는 데 실패했습니다.</p>
          <button
            className="group mt-2 rounded-full bg-neutral-500 px-4 py-4 text-white"
            onClick={() => refetch()}
          >
            <RotateCw className="h-6 w-6 group-focus:[animation:spin_1s_linear_1]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-5 text-center text-[40px] font-bold text-[#333333]">
        급등주
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {marketCapRanks.map((rank, idx) => (
          <StockCard
            key={rank.stockName}
            className={idx === 0 ? 'col-span-2' : ''}
            rank={idx + 1}
            code={rank.stockCode}
            name={rank.stockName}
            price={rank.openingPrice - rank.endingPrice}
            change={rank.prdyCtrt}
            marketCap={rank.openingPrice}
          />
        ))}
      </div>
    </div>
  );
}
