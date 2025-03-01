import { queryOptions } from '@tanstack/react-query';
import { getStockSummary } from './get-stock';

export const stockQueries = {
  all: () => ['stocks', 'all'],
  details: () => [...stockQueries.all(), 'details'],
  detail: (stockCode: string) =>
    queryOptions({
      queryKey: [...stockQueries.details(), stockCode],
      queryFn: () => getStockSummary(stockCode),
    }),
};
