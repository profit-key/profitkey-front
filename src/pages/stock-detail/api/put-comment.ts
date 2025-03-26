import { httpClient } from '@/shared/api';
import { PutComment } from './schema';

export type PutCommentRequestParams = {
  id: string;
  writerId: number;
  parentId: string;
  content: string;
};

export const putComment = async (
  comment: PutCommentRequestParams
): Promise<PutComment> => {
  const response = await httpClient.put('/api/community', comment);
  return PutComment.parse(response);
};
