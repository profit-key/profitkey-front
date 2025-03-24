import { httpClient } from '@/shared/api';

export const deleteComment = async (commentId: string) => {
  await httpClient.delete(`/api/community/${commentId}`);
};
