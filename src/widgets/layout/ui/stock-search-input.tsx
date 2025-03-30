import { stockQueries } from '@/entities/stock';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function StockSearchInput() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { data } = useQuery({
    ...stockQueries.search(query),
    enabled: Boolean(query.length > 0),
  });

  const handleStockClick = (code: string) => {
    setQuery('');
    navigate(`/stocks/${code}`);
  };

  return (
    <div className="relative">
      <input
        value={query}
        className="h-14 w-72 rounded-2xl border-[1px] border-[#cfcfcf] px-5 py-4"
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length > 0 && (
        <div className="absolute flex w-full flex-col gap-2 rounded-md border bg-white p-3 shadow-lg">
          {data?.length === 0 && (
            <div className="text-center text-sm text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
          {data?.map((stock) => (
            <button
              className="rounded-sm p-1 text-start hover:bg-gray-200"
              onClick={() => handleStockClick(stock.stockCode)}
            >
              {stock.stockName}({stock.stockCode})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
