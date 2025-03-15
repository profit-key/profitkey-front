import { queryOptions } from '@tanstack/react-query';
import { getFavoriteStocks } from './get-favorite-stocks';

export const favoriteStockQueries = {
  all: () => ['favorite-stocks', 'all'],
  lists: () => [...favoriteStockQueries.all(), 'lists'],
  list: () =>
    queryOptions({
      queryKey: [...favoriteStockQueries.lists()],
      queryFn: () => getFavoriteStocks(),
    }),
};
