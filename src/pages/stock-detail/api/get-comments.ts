import { httpClient } from '@/shared/api';
import { CommunityResponse } from './schema';

export type GetCommentsRequestParams = {
  stockCode: string;
  page?: number;
  order?: 'LATEST' | 'POPULAR';
};

export const getComments = async (params: GetCommentsRequestParams) => {
  const { stockCode, ...restParams } = params;
  const response = await httpClient.get(`/api/community/${stockCode}`, {
    params: restParams,
  });
  return CommunityResponse.parse(response);
};
