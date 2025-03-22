import { StockCard } from './stock-card';

export function RankingSection() {
  return (
    <div className="border-b border-[#d4d4d4] py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-3 gap-x-2">
        <div>
          <h2 className="mb-5 text-center text-[40px] font-bold text-[#333333]">
            급등주
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <StockCard
              className="col-span-2"
              rank={1}
              name="SM LIFE DESIGN"
              price={10000}
              change={10}
              marketCap={100000}
            />
            <StockCard
              rank={2}
              name="SM LIFE DESIGN"
              price={10000}
              change={10}
              marketCap={100000}
            />
            <StockCard
              rank={3}
              name="SM LIFE DESIGN"
              price={-10000}
              change={-10}
              marketCap={100000}
            />
            <StockCard
              rank={4}
              name="SM LIFE DESIGN"
              price={10000}
              change={10}
              marketCap={100000}
            />
            <StockCard
              rank={5}
              name="SM LIFE DESIGN"
              price={0}
              change={0}
              marketCap={100000}
            />
          </div>
        </div>
        <div>
          <h2 className="mb-5 text-center text-[40px] font-bold text-[#333333]">
            주식 TOP5
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <StockCard
              className="col-span-2"
              rank={1}
              name="SM LIFE DESIGN"
              price={10000}
              change={10}
              marketCap={100000}
            />
            <StockCard
              rank={2}
              name="SM LIFE DESIGN"
              price={10000}
              change={10}
              marketCap={100000}
            />
            <StockCard
              rank={3}
              name="SM LIFE DESIGN"
              price={10000}
              change={10}
              marketCap={100000}
            />
            <StockCard
              rank={4}
              name="SM LIFE DESIGN"
              price={10000}
              change={10}
              marketCap={100000}
            />
            <StockCard
              rank={5}
              name="SM LIFE DESIGN"
              price={10000}
              change={10}
              marketCap={100000}
            />
          </div>
        </div>
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
      </div>
    </div>
  );
}
