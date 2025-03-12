import {
  StockPriceResponse,
  StockSummary,
  StockDetailResponse,
} from './schema';
import { httpClient } from '@/shared/api';

type StockPriceRequest = {
  tr_id: string;
  mrktDivCode: string;
  fidInput: string;
  custtype: string;
};

type StockDetailRequest = {
  mrktDivCode: string;
  fidInput: string;
  custtype: string;
  cts: string;
  gb1: string;
  fdt: string;
  tdt: string;
  highGb: string;
};

export const getStockPrice = async (
  stockCode: string
): Promise<StockPriceResponse> => {
  const requestBody: StockPriceRequest = {
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

export const getStockDetail = async (
  stockCode: string
): Promise<StockDetailResponse> => {
  const requestBody: StockDetailRequest = {
    mrktDivCode: 'J',
    fidInput: stockCode,
    custtype: 'P',
    cts: 'string',
    gb1: '0',
    fdt: '20240101',
    tdt: '20241231',
    highGb: 'string',
  };

  const response = await httpClient.post(
    '/api/stock/quotations/stock-detail',
    requestBody
  );

  return StockDetailResponse.parse(response);
};

export const getStockSummary = async (
  stockCode: string
): Promise<StockSummary> => {
  const stockDetail = await getStockDetail(stockCode);
  const stockPrice = await getStockPrice(stockCode);

  return {
    code: stockCode,
    mrktName: stockDetail.stockCode.marketCategory,
    name: stockDetail.stockCode.stockName,
    price: stockPrice.output.stck_prpr,
    change: stockPrice.output.prdy_vrss,
    changeRate: stockPrice.output.prdy_ctrt,
  };
};
