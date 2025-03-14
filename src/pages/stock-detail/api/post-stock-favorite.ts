import { httpClient } from '@/shared/api';
import { StockFavorite, UserFavoriteStock } from './schema';

export const postStockFavorite = async (
  params: StockFavorite
): Promise<UserFavoriteStock> => {
  const response = await httpClient.post(`/api/users/favorite-stocks`, {
    stockCode: params.stockCode,
  });
  return UserFavoriteStock.parse(response);
};
