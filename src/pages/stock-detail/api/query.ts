import { StockFavorite } from './schema';
import { postStockFavorite } from './post-stock-like';
import { getStockFavorite } from './get-stock-favorite';
import { queryOptions } from '@tanstack/react-query';
import { deleteStockFavorite } from './delete-stock-favorite';
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
  like: (params: StockFavorite) =>
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
