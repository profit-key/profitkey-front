import { httpClient } from '@/shared/api';
import { StockRank } from './schema';

export type GetStockRanksRequestParams = {
  division: 'MARKET_CAP' | 'HTS_TOP';
};

export const getStockRanks = async (
  params: GetStockRanksRequestParams
): Promise<StockRank[]> => {
  const response = await httpClient.get(
    `/api/stock-info/daily-rank/${params.division}`
  );
  return StockRank.array().parse(response);
};
