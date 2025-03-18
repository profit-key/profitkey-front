import { z } from 'zod';

export const FavoriteStock = z.object({
  stockCode: z.string(),
  stockName: z.string(),
  liked: z.boolean(),
});
export type FavoriteStock = z.infer<typeof FavoriteStock>;

export const UserComment = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  nickname: z.string(),
});
export type UserComment = z.infer<typeof UserComment>;
