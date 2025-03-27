import { httpClient } from '@/shared/api';
import { CommentLiked } from './schema';

export const postCommentLike = async (params: CommentLiked): Promise<void> => {
  await httpClient.post(`/api/community/like`, {
    commentId: params.commentId,
    userId: params.userId,
    liked: params.liked,
  });
};
