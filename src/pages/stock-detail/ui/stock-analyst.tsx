type StockProps = {
  stockCode: string;
};

export function StockAnalyst({ stockCode }: StockProps) {
  return (
    <div>
      <h3>({stockCode}) 종목 분석 테이블</h3>
      <iframe
        className="mt-8 h-[524px] w-[514px] border-none"
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_123&symbol=AAPL&interval=D&theme=light"
      />

      <h3>AI 코멘트</h3>

      <h3>
        재무지표 <small>(분기별)</small>
      </h3>

      <h3>투자사별 주식 분석</h3>
      <h4>통계 한눈에 보기</h4>
      <h4>투자사별 의견</h4>
    </div>
  );
}
