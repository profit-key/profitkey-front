import { stockQueries } from '@/entities/stock';
import { formatNumberWithCommas } from '@/shared/lib/number';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  stockCode: string;
};

function StockPrice({ stockCode }: Props) {
  const { data: stockSummary } = useSuspenseQuery(
    stockQueries.summary(stockCode)
  );

  return (
    <>
      <div className="rounded-lg bg-[#D9001B33] px-1 py-3">
        {stockSummary.changeRate}%
      </div>
      <span className="text-xl font-bold">
        {formatNumberWithCommas(+stockSummary.price)}원
      </span>
    </>
  );
}

function Loading() {
  return (
    <>
      <Skeleton className="h-12 w-12" />
      <Skeleton className="h-7 w-20" />
    </>
  );
}

StockPrice.Loading = Loading;

export { StockPrice };
