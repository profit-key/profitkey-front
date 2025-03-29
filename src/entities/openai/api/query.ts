import { queryOptions } from '@tanstack/react-query';
import { getMarketOpinion } from './get-market-opinion';
import { getStockOpinion } from './get-stock-opinion';

export const openaiQueries = {
  all: () => ['openai', 'all'],
  marketOpinion: () =>
    queryOptions({
      queryKey: [...openaiQueries.all(), 'market-opinion'],
      queryFn: () => getMarketOpinion(),
    }),
  stockOpinion: (stockCode: string) =>
    queryOptions({
      queryKey: [...openaiQueries.all(), 'stock-opinion', stockCode],
      queryFn: () => getStockOpinion(stockCode),
    }),
};
