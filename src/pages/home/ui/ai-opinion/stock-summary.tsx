import { stockQueries } from '@/entities/stock';
import { formatNumberWithCommas } from '@/shared/lib/number';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  stockCode: string;
};

function StockSummary({ stockCode }: Props) {
  const {
    data: { fiftyTwoWeekHigh, fiftyTwoWeekLow, per, pbr, eps, bps },
  } = useSuspenseQuery(stockQueries.detail(stockCode));

  return (
    <div className="mt-6 grid grid-cols-[auto_auto_auto_auto_auto_auto]">
      <span className="text-base text-[#333]">최고가</span>
      <span className="text-base font-bold text-[#333]">
        {formatNumberWithCommas(fiftyTwoWeekHigh)}원
      </span>
      <span className="text-base text-[#333]">최저가</span>
      <span className="text-base font-bold text-[#333]">
        {formatNumberWithCommas(fiftyTwoWeekLow)}원
      </span>
      <span className="text-base text-[#333]">PER</span>
      <span className="text-base font-bold text-[#333]">{per}배</span>
      <span className="text-base text-[#333]">PBR</span>
      <span className="text-base font-bold text-[#333]">{pbr}배</span>
      <span className="text-base text-[#333]">EPS</span>
      <span className="text-base font-bold text-[#333]">
        {formatNumberWithCommas(eps)}
      </span>
      <span className="text-base text-[#333]">BPS</span>
      <span className="text-base font-bold text-[#333]">
        {formatNumberWithCommas(bps)}
      </span>
    </div>
  );
}

function Loading() {
  return <div></div>;
}

StockSummary.Loading = Loading;

export { StockSummary };
