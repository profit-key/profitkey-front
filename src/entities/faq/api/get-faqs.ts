import { z } from 'zod';
import { httpClient } from '@/shared/api';
import { FAQ } from './schema';

const GetFaqsResponse = z.object({
  faqList: z.array(FAQ),
  pagination: z.object({
    totalPages: z.number(),
    totalElements: z.number(),
    currentPage: z.number(),
  }),
});
type GetFaqsResponse = z.infer<typeof GetFaqsResponse>;

export type GetFaqsRequestParams = {
  page: number;
  size: number;
};

export const getFaqs = async (
  params: GetFaqsRequestParams
): Promise<GetFaqsResponse> => {
  const response = await httpClient.get('/api/faq/list', { params });

  return GetFaqsResponse.parse(response);
};
