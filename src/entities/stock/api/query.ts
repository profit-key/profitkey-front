import { queryOptions } from '@tanstack/react-query';
import { getStockDetail, getStockPrice, getStockSummary } from './get-stock';

export const stockQueries = {
  all: () => ['stocks', 'all'],
  details: () => [...stockQueries.all(), 'details'],
  detail: (stockCode: string) =>
    queryOptions({
      queryKey: [...stockQueries.details(), stockCode],
      queryFn: () => getStockDetail(stockCode),
    }),
  price: (stockCode: string) =>
    queryOptions({
      queryKey: [...stockQueries.details(), 'price', stockCode],
      queryFn: () => getStockPrice(stockCode),
    }),
  summary: (stockCode: string) =>
    queryOptions({
      queryKey: [...stockQueries.details(), 'summary', stockCode],
      queryFn: () => getStockSummary(stockCode),
    }),
};
