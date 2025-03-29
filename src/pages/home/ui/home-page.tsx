import { AiRecommendSection } from './ai-opinion/ai-recommend-section';
import { NewsSection } from './news/news-section';
import { RankingSection } from './ranking/ranking-section';

export function HomePage() {
  return (
    <div>
      <AiRecommendSection />
      <RankingSection />
      <NewsSection />
    </div>
  );
}
