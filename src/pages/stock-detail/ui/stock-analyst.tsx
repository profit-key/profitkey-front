import { StockAnalysisTable } from './stock-analysis-table';
import { FinancialTable } from './financial-table';
import { InvestorOpinionTable } from './investor-opinion-table';
import { InvestorOpinionChart } from './investor-opinion-chart';
import { useSuspenseQuery } from '@tanstack/react-query';
import { stockQueries } from '@/entities/stock/api/query';

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

  const aiComment =
    '매출액 증가율(21.74%)은 299910보다 낮지만, 자기자본 증가율(46.63%)과 총자산 증가율(27.50%)이 긍정적임 수익성 지표에서 총자본 순이익율(4.81%), 자기자본 순이익율(11.69%), 매출액 순이익율(6.24%)이 양호하며, 299910의 수익성 지표가 모두 음수인 것과 대조됨 안정성 지표에서 부채 비율(109.58%)이 299910(806.53%)보다 낮고, 차입금 의존도(13.31%)도 양호함 유동 비율(151.64%)이 299910(86.72%)보다 높아 재무 건전성이 우수함';

  const {
    data: { output: investorOpinions },
  } = useSuspenseQuery(stockQueries.investorOpinions(stockCode));

  return (
    <div className="flex flex-col gap-16">
      <section className="border-b border-black pb-8">
        <h3 className="sr-only">종목({stockCode}) 분석</h3>
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
          {aiComment}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold">
          재무지표 <small className="text-base text-[#6e6e6e]">(분기별)</small>
        </h3>
        <FinancialTable />
      </section>

      <section className="flex flex-col gap-8">
        <h3 className="text-3xl font-bold">투자사별 주식 분석</h3>
        <div className="flex h-[400px] gap-12">
          <div className="flex-1">
            <h4 className="text-2xl font-bold">통계 한눈에 보기</h4>
            <InvestorOpinionChart />
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
