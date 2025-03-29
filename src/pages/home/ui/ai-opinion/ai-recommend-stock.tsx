import { openaiQueries } from '@/entities/openai';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { StockSummary } from './stock-summary';
import { Suspense } from 'react';

function AiRecommendStock() {
  const { data } = useSuspenseQuery(openaiQueries.marketOpinion());

  return (
    <div className="mt-8 max-w-[514px] p-5 shadow-[0px_2px_8px_0px_#63636333]">
      <div className="flex items-center gap-7">
        <span className="text-base font-bold">{data.stockCode.stockName}</span>
        <Suspense fallback={<StockSummary.Loading />}>
          <StockSummary stockCode={data.stockCode.stockCode} />
        </Suspense>
      </div>
      <iframe
        className="mt-4 h-[320px] w-[474px] border-none"
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_123&symbol=AAPL&interval=D&theme=light"
      />
      <div className="mt-[10px] bg-[#FFB40033] p-4">
        <span className="text-sm font-bold text-[#333]">AI 코멘트</span>
        <p className="mt-3 text-base text-[#333]">{data.aiResponse}</p>
      </div>
    </div>
  );
}

function Loading() {
  return <Skeleton className="h-[646px] w-[514px]" />;
}

AiRecommendStock.Loading = Loading;

export { AiRecommendStock };
