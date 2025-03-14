import { httpClient } from '@/shared/api';
import { StockFavorite } from './schema';

export const deleteStockFavorite = async (params: StockFavorite) => {
  await httpClient.delete(`/api/users/favorite-stocks/${params.stockCode}`);
  return true;
};
