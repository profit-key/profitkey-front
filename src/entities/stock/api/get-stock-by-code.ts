import { httpClient } from '@/shared/api';
import { StockCode } from './schema';

export const getStockByCode = async (code: string) => {
  const response = httpClient.get(`/api/stock/search/${code}`);

  return StockCode.parse(response);
};
