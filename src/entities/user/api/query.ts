import { queryOptions } from '@tanstack/react-query';
import { getFavoriteStocks } from './get-favorite-stocks';
import { getComments } from './get-comments';

export const userQueries = {
  all: () => ['users'],
  favoriteStocksList: () =>
    queryOptions({
      queryKey: [...userQueries.all(), 'favorite-stocks'],
      queryFn: () => getFavoriteStocks(),
    }),
  commentList: () =>
    queryOptions({
      queryKey: [...userQueries.all(), 'comments'],
      queryFn: () => getComments(),
    }),
};
