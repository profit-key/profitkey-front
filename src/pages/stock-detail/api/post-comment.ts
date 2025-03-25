import { httpClient } from '@/shared/api';
import { PostComment } from './schema';

export type PostCommentRequestParams = {
  stockCode: string;
  writerId: number;
  parentId: string;
  content: string;
};

export const postComment = async (
  comment: PostCommentRequestParams
): Promise<PostComment> => {
  const response = await httpClient.post('/api/community', comment);
  return PostComment.parse(response);
};
