import { httpClient } from '@/shared/api';
import { CommunityResponse } from './schema';

export type GetCommentRepliesRequestParams = {
  id: string;
  page?: number;
  order?: 'latest' | 'popular';
};

export const getCommentReplies = async (
  params: GetCommentRepliesRequestParams
) => {
  const response = await httpClient.get(`/api/community/detail`, {
    params,
  });
  return CommunityResponse.parse(response);
};
