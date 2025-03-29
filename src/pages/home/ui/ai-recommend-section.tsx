import { useSuspenseQuery } from '@tanstack/react-query';
import { openaiQueries } from '../api/query';

export function AiRecommendSection() {
  const { data } = useSuspenseQuery(openaiQueries.opinion());

  return (
    <div className="border-b border-[#d4d4d4] pb-28 pt-20">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex flex-col gap-8">
          <h2 className="text-[64px] font-bold text-[#333333]">
            투자성공의
            <br />
            <span className="text-[#ffb400]">열쇠</span>를 찾다
          </h2>
          <p className="text-[24px] text-[#555555]">
            국내외 주식과 금융 뉴스를 쉽게 한눈에!
            <br />
            스마트한 투자 전략을 제시합니다.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[24px] font-bold text-[#333333]">
            AI 추천종목
          </div>
          <div className="mt-8 max-w-[514px] p-5 shadow-[0px_2px_8px_0px_#63636333]">
            <div className="flex items-center gap-7">
              <span className="text-base font-bold">
                {data.stockCode.stockName}
              </span>
              <div className="rounded-lg bg-[#D9001B33] px-1 py-3">+15%</div>
              <span className="text-xl font-bold">45,600원</span>
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
        </div>
      </div>
    </div>
  );
}
