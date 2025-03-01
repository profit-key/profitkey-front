import { StockPriceResponse, StockName, StockSummary } from './schema';
import { httpClient } from '@/shared/api';

type StockDetailRequest = {
  tr_id: string;
  mrktDivCode: string;
  fidInput: string;
  custtype: string;
};

export const getStockName = async (stockCode: string): Promise<StockName> => {
  const response = await httpClient.get(`/api/stock/${stockCode}`);
  return StockName.parse(response);
};

export const getStockPrice = async (
  stockCode: string
): Promise<StockPriceResponse> => {
  const requestBody: StockDetailRequest = {
    tr_id: 'FHKST01010100',
    mrktDivCode: 'J',
    fidInput: stockCode,
    custtype: 'P',
  };

  const response = await httpClient.post(
    '/api/stock/quotations/inquire-price',
    requestBody
  );

  return StockPriceResponse.parse(response);
};

export const getStockSummary = async (
  stockCode: string
): Promise<StockSummary> => {
  const stockName = await getStockName(stockCode);
  const stockPrice = await getStockPrice(stockCode);

  return {
    code: stockCode,
    mrktName: stockPrice.output.rprs_mrkt_kor_name,
    name: stockName,
    price: stockPrice.output.stck_prpr,
    change: stockPrice.output.prdy_vrss,
    changeRate: stockPrice.output.prdy_ctrt,
  };
};
