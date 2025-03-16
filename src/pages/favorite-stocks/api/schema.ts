import { z } from 'zod';

export const FavoriteStock = z.object({
  stockCode: z.string(),
  stockName: z.string(),
  liked: z.boolean(),
});
export type FavoriteStock = z.infer<typeof FavoriteStock>;
