import { httpClient } from '@/shared/api';
import { AiAnalysisOpinion } from './schema';

export const getMarketOpinion = async (): Promise<AiAnalysisOpinion> => {
  const response = await httpClient.post('/api/openai/opinion');

  return AiAnalysisOpinion.parse(response);
};
