import { queryOptions } from '@tanstack/react-query';
import {
  getStockRanks,
  type GetStockRanksRequestParams,
} from './get-stock-ranks';
import { getOpenaiOpinion } from './get-openai-opinion';

export const rankQueries = {
  all: () => ['ranks', 'all'],
  lists: () => [...rankQueries.all(), 'lists'],
  list: (params: GetStockRanksRequestParams) =>
    queryOptions({
      queryKey: [...rankQueries.lists(), params],
      queryFn: () => getStockRanks(params),
    }),
};

export const openaiQueries = {
  all: () => ['openai', 'all'],
  opinion: () =>
    queryOptions({
      queryKey: [...openaiQueries.all(), 'opinion'],
      queryFn: () => getOpenaiOpinion(),
    }),
};
