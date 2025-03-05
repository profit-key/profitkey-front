import { queryOptions } from '@tanstack/react-query';
import { getStockSummary } from './get-stock';

export const stockQueries = {
  all: () => ['stocks', 'all'],
  details: () => [...stockQueries.all(), 'details'],
  summary: (stockCode: string) =>
    queryOptions({
      queryKey: [...stockQueries.details(), stockCode],
      queryFn: () => getStockSummary(stockCode),
    }),
};
