import { httpClient } from '@/shared/api';
import { AiAnalysisOpinion } from './schema';

export const getStockOpinion = async (
  stockCode: string
): Promise<AiAnalysisOpinion> => {
  const response = await httpClient.post(`/api/openai/opinion/${stockCode}`);

  return AiAnalysisOpinion.parse(response);
};
