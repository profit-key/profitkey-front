import { useParams } from 'react-router';

export function StockDetailPage() {
  const { stockCode } = useParams();

  console.log('stockCode:', stockCode);
  return (
    <div>
      <h2>주식 상세 페이지</h2>
      <h3>
        종목코드 : <span>{stockCode}</span>
      </h3>
    </div>
  );
}
