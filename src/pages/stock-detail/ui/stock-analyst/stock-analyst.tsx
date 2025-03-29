import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { stockQueries } from '@/entities/stock';
import { openaiQueries } from '@/entities/openai';
import { StockAnalysisTable } from './stock-analysis-table';
import { FinancialTable } from './financial-table';
import { InvestorOpinionChart } from './investor-opinion-chart';
import { InvestorOpinionTable } from './investor-opinion-table';

type StockProps = {
  stockCode: string;
};

export function StockAnalyst({ stockCode }: StockProps) {
  const { data: stockDetail } = useSuspenseQuery(
    stockQueries.detail(stockCode)
  );
  const { data: stockPrice } = useSuspenseQuery(stockQueries.price(stockCode));

  const analysisData = {
    yearHighPrice: stockDetail.fiftyTwoWeekHigh,
    yearLowPrice: stockDetail.fiftyTwoWeekLow,
    per: stockDetail.per,
    pbr: stockDetail.pbr,
    eps: stockDetail.eps,
    bps: stockDetail.bps,
    highPriceRatio: stockPrice.output.dryy_hgpr_vrss_prpr_rate,
    lowPriceRatio: stockPrice.output.dryy_lwpr_vrss_prpr_rate,
    dividend: stockDetail.diviAmt,
    dividendYield: stockDetail.diviRate,
  };

  const { data: aiComment } = useSuspenseQuery(
    openaiQueries.stockOpinion(stockCode)
  );

  const {
    data: { output: investorOpinions },
  } = useSuspenseQuery(stockQueries.investorOpinions(stockCode));

  return (
    <div className="flex flex-col gap-16">
      <section className="border-b border-black pb-8">
        <h3 className="sr-only">주요 정보</h3>
        <div className="flex">
          <div className="w-1/2">
            <h4 className="sr-only">종목 테이블</h4>
            <StockAnalysisTable data={analysisData} />
          </div>
          <div className="ml-8 flex-1">
            <h4 className="sr-only">종목 차트</h4>
            <iframe
              className="h-full w-full border-none"
              src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_123&symbol=AAPL&interval=D&theme=light"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold">AI 코멘트</h3>
        <div className="min-h-[50px] w-full break-words rounded-[5px] bg-[#FFB40033] p-4">
          {aiComment.aiResponse}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold">
          재무지표 <small className="text-base text-[#6e6e6e]">(분기별)</small>
        </h3>
        <Suspense>
          <FinancialTable stockCode={stockCode} />
        </Suspense>
      </section>

      <section className="flex flex-col gap-8">
        <h3 className="text-3xl font-bold">투자사별 주식 분석</h3>
        <div className="flex h-[400px] gap-12">
          <div className="flex-1">
            <h4 className="text-2xl font-bold">통계 한눈에 보기</h4>
            <InvestorOpinionChart data={investorOpinions} />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <h4 className="text-2xl font-bold">투자사별 의견</h4>
            <div className="flex-1 overflow-auto">
              <InvestorOpinionTable data={investorOpinions} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
