import { StockCard } from './stock-card';

export function MarketInfoSection() {
  return (
    <div>
      <h2 className="mb-5 text-center text-[40px] font-bold text-[#333333]">
        주요 시장 정보
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <StockCard
          name="코스피"
          nation="ko"
          price={10000}
          change={10}
          marketCap={100000}
        />
        <StockCard
          name="코스닥"
          nation="ko"
          price={10000}
          change={10}
          marketCap={100000}
        />
        <StockCard
          name="원/달러"
          nation="us"
          price={10000}
          change={10}
          marketCap={100000}
        />
        <StockCard
          name="다우존스"
          nation="us"
          price={10000}
          change={10}
          marketCap={100000}
        />
        <StockCard
          name="S&P 500"
          nation="us"
          price={10000}
          change={10}
          marketCap={100000}
        />
        <StockCard
          name="나스닥"
          nation="us"
          price={10000}
          change={10}
          marketCap={100000}
        />
      </div>
    </div>
  );
}
