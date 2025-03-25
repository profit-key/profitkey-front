import { StockFavorite } from './schema';
import { postStockFavorite } from './post-stock-favorite';
import { getStockFavorite } from './get-stock-favorite';
import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';
import { deleteStockFavorite } from './delete-stock-favorite';
import { GetCommentsRequestParams } from './get-comments';
import { getComments } from './get-comments';
import { getFinancialData } from './get-financial-data';
import {
  getCommentReplies,
  GetCommentRepliesRequestParams,
} from './get-comment-replies';
import { deleteComment } from './delete-comment';
import { postComment, type PostCommentRequestParams } from './post-comment';

export const stockFavoriteMutation = {
  like: {
    mutationFn: (params: StockFavorite) => postStockFavorite(params),
  },
  unlike: {
    mutationFn: (params: StockFavorite) => deleteStockFavorite(params),
  },
};

export const stockFavoriteQueries = {
  isLiked: (params: StockFavorite) =>
    queryOptions({
      queryKey: ['favorite-stocks', params],
      queryFn: () => getStockFavorite(params),
    }),
};

export const financialDataQueries = {
  financialData: (stockCode: string) =>
    queryOptions({
      queryKey: ['financial-data', stockCode],
      queryFn: () => getFinancialData(stockCode),
    }),
};

export const communityQueries = {
  all: () => ['community', 'all'],
  lists: () => [...communityQueries.all(), 'lists'],
  list: (params: GetCommentsRequestParams) =>
    infiniteQueryOptions({
      queryKey: [...communityQueries.lists(), params],
      queryFn: ({ pageParam }) => getComments({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return;
        return lastPage.number + 2;
      },
    }),
  replies: () => [...communityQueries.all(), 'replies'],
  replyList: (params: GetCommentRepliesRequestParams) =>
    infiniteQueryOptions({
      queryKey: [...communityQueries.replies(), params],
      queryFn: ({ pageParam }) =>
        getCommentReplies({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return;
        return lastPage.number + 2;
      },
    }),
};

export const commentMutation = {
  post: {
    mutationFn: (comment: PostCommentRequestParams) => postComment(comment),
    onError: (error: Error) => {
      alert('댓글 등록 실패 : ' + error.message);
    },
  },
  delete: {
    mutationFn: (commentId: string) => deleteComment(commentId),
    onError: (error: Error) => {
      alert('삭제 실패 : ' + error.message);
    },
  },
};
