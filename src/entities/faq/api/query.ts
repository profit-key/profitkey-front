import { queryOptions } from '@tanstack/react-query';
import { getFaqs, type GetFaqsRequestParams } from './get-faqs';

export const faqQueries = {
  all: () => ['faqs', 'all'],
  lists: () => [...faqQueries.all(), 'lists'],
  list: (params: GetFaqsRequestParams) =>
    queryOptions({
      queryKey: [...faqQueries.lists(), params],
      queryFn: () => getFaqs(params),
    }),
};
