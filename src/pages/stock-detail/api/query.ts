import { StockFavorite } from './schema';
import { postStockFavorite } from './post-stock-favorite';
import { getStockFavorite } from './get-stock-favorite';
import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';
import { deleteStockFavorite } from './delete-stock-favorite';
import { GetCommentsRequestParams } from './get-comments';
import { getComments } from './get-comments';
import { getFinancialData } from './get-financial-data';

export const stockFavoriteMutation = {
  like: {
    mutationFn: (params: StockFavorite) => postStockFavorite(params),
  },
  unlike: {
    mutationFn: (params: StockFavorite) => deleteStockFavorite(params),
  },
};

export const stockFavoriteQueries = {
  isLiked: (params: StockFavorite) =>
    queryOptions({
      queryKey: ['favorite-stocks', params],
      queryFn: () => getStockFavorite(params),
    }),
};

export const financialDataQueries = {
  financialData: (stockCode: string) =>
    queryOptions({
      queryKey: ['financial-data', stockCode],
      queryFn: () => getFinancialData(stockCode),
    }),
};

export const communityQueries = {
  all: () => ['community', 'all'],
  lists: () => [...communityQueries.all(), 'lists'],
  list: (params: GetCommentsRequestParams) =>
    infiniteQueryOptions({
      queryKey: [...communityQueries.lists(), params],
      queryFn: ({ pageParam }) => getComments({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return;
        return lastPage.number + 2;
      },
    }),
};
