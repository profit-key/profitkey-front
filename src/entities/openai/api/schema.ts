import { z } from 'zod';

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
