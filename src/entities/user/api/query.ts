import { queryOptions } from '@tanstack/react-query';
import { getFavoriteStocks } from './get-favorite-stocks';
import { getComments } from './get-comments';

export const userQueries = {
  all: () => ['users'],
  favoriteStocksList: () =>
    queryOptions({
      queryKey: [...userQueries.all()],
      queryFn: () => getFavoriteStocks(),
    }),
  commentList: () =>
    queryOptions({
      queryKey: [...userQueries.all()],
      queryFn: () => getComments(),
    }),
};
