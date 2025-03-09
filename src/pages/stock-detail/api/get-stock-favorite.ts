import { httpClient } from '@/shared/api';
import { StockFavorite, UserFavoriteStock } from './schema';

export const getStockFavorite = async (
  params: StockFavorite
): Promise<UserFavoriteStock> => {
  const response = await httpClient.get(
    `/api/users/${params.userId}/favorite-stocks/${params.stockCode}`
  );
  return UserFavoriteStock.parse(response);
};
