import { httpClient } from '@/shared/api';
import { InvestorOpinionResponse } from './schema';

export type GetInvestorOpinionsParams = {
  tr_id: string;
  custtype: string;
  fidCondMrktDivCode: string;
  fidCondScrDivCode: string;
  fidInputIscd: string;
  fidInputDate1: string;
  fidInputDate2: string;
};

export const getInvestorOpinions = async (
  stockCode: string
): Promise<InvestorOpinionResponse> => {
  const requestBody: GetInvestorOpinionsParams = {
    tr_id: 'FHKST663300C0',
    custtype: 'P',
    fidCondMrktDivCode: 'J',
    fidCondScrDivCode: '16633',
    fidInputIscd: stockCode,
    fidInputDate1: '0020250101',
    fidInputDate2: '0020251231',
  };

  const response = await httpClient.post(
    '/api/stock/quotations/invest-opinion',
    requestBody
  );

  return InvestorOpinionResponse.parse(response);
};
