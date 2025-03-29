import { openaiQueries } from '@/entities/openai';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { StockPrice } from './stock-price';
import { Suspense } from 'react';
import { StockSummary } from './stock-summary';

function AiRecommendStock() {
  const { data } = useSuspenseQuery(openaiQueries.marketOpinion());

  return (
    <div className="mt-8 max-w-[514px] p-5 shadow-[0px_2px_8px_0px_#63636333]">
      <div className="flex items-center gap-7">
        <span className="text-base font-bold">{data.stockCode.stockName}</span>
        <Suspense fallback={<StockPrice.Loading />}>
          <StockPrice stockCode={data.stockCode.stockCode} />
        </Suspense>
      </div>
      <iframe
        className="mt-4 h-[320px] w-[474px] border-none"
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_123&symbol=AAPL&interval=D&theme=light"
      />
      <Suspense fallback={<StockSummary.Loading />}>
        <StockSummary stockCode={data.stockCode.stockCode} />
      </Suspense>
      <div className="mt-10 bg-[#FFB40033] p-4">
        <span className="text-sm font-bold text-[#333]">AI 코멘트</span>
        <p className="mt-3 text-base text-[#333]">{data.aiResponse}</p>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="mt-8">
      <Skeleton className="h-[604px] w-[514px]" />
    </div>
  );
}

AiRecommendStock.Loading = Loading;

export { AiRecommendStock };
