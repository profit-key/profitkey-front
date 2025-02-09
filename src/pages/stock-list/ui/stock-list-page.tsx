import { Link } from 'react-router';

export function StockListPage() {
  return (
    <div>
      <h2>StockList</h2>
      <Link to="/stocks/123456">Sample: 123456 상세페이지 이동</Link>
    </div>
  );
}
