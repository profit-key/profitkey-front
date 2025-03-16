import { httpClient } from '@/shared/api';
import { FinancialDataResponse } from './schema';

export type GetFinancialDataRequestParams = {
  tr_id: string;
  custtype: string;
  fidDivClsCode: string;
  fidCondMrktDivCode: string;
  fidInputIscd: string;
};

export const getFinancialData = async (
  stockCode: string
): Promise<FinancialDataResponse> => {
  const requestBody: GetFinancialDataRequestParams = {
    tr_id: 'FHKST66430300',
    custtype: 'P',
    fidDivClsCode: '1',
    fidCondMrktDivCode: 'J',
    fidInputIscd: stockCode,
  };
  const response = await httpClient.post(
    '/api/stock/item/financial-ratio',
    requestBody
  );

  return FinancialDataResponse.parse(response);
};
