import { queryOptions } from '@tanstack/react-query';
import {
  getStockRanks,
  type GetStockRanksRequestParams,
} from './get-stock-ranks';

export const rankQueries = {
  all: () => ['ranks', 'all'],
  lists: () => [...rankQueries.all(), 'lists'],
  list: (params: GetStockRanksRequestParams) =>
    queryOptions({
      queryKey: [...rankQueries.lists(), params],
      queryFn: () => getStockRanks(params),
    }),
};
