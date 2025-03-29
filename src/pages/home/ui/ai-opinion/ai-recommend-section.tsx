import { Suspense } from 'react';
import { AiRecommendStock } from './ai-recommend-stock';

export function AiRecommendSection() {
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
          <Suspense fallback={<AiRecommendStock.Loading />}>
            <AiRecommendStock />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
