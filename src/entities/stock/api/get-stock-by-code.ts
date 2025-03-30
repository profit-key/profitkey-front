import { httpClient } from '@/shared/api';
import { StockCode } from './schema';
import { z } from 'zod';

export const getStockByCode = async (code: string): Promise<StockCode[]> => {
  const response = await httpClient.get(`/api/stock/search/${code}`);

  return z.array(StockCode).parse(response);
};
