import { z } from 'zod';

export const StockFavorite = z.object({
  userId: z.number(),
  stockCode: z.string(),
});

export type StockFavorite = z.infer<typeof StockFavorite>;

export const UserFavoriteStock = z.boolean();
export type UserFavoriteStock = z.infer<typeof UserFavoriteStock>;
