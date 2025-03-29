import { z } from 'zod';

export const StockRank = z.object({
  stockCode: z.string(),
  stockName: z.string(),
  baseDate: z.string(),
  endingPrice: z.number(),
  openingPrice: z.number(),
  prdyCtrt: z.number(),
  highPrice: z.number(),
  lowPrice: z.number(),
  tradingVolume: z.number(),
  tradingValue: z.number(),
  marketCap: z.number(),
  fiftyTwoWeekHigh: z.number(),
  fiftyTwoWeekLow: z.number(),
  per: z.number(),
  eps: z.number(),
  pbr: z.number(),
  bps: z.number(),
});
export type StockRank = z.infer<typeof StockRank>;

export const AiAnalysisOpinion = z.object({
  id: z.number(),
  aiRequest: z.string(),
  aiResponse: z.string(),
  createdAt: z.string(),
  stockCode: z.object({
    stockCode: z.string(),
    stockName: z.string(),
    marketCategory: z.string(),
  }),
});
export type AiAnalysisOpinion = z.infer<typeof AiAnalysisOpinion>;
