import { StockFavorite } from './schema';
import { postStockFavorite } from './post-stock-favorite';
import { getStockFavorite } from './get-stock-favorite';
import { queryOptions } from '@tanstack/react-query';
import { deleteStockFavorite } from './delete-stock-favorite';

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
