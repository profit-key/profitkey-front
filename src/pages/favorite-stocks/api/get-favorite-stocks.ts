import { z } from 'zod';
import { FavoriteStock } from './schema';
import { httpClient } from '@/shared/api';

const GetFavoriteStocksResponse = z.array(FavoriteStock);
type GetFavoriteStocksResponse = z.infer<typeof GetFavoriteStocksResponse>;

export const getFavoriteStocks =
  async (): Promise<GetFavoriteStocksResponse> => {
    const response = await httpClient.get('/api/users/favorite-stocks');

    return GetFavoriteStocksResponse.parse(response);
  };
