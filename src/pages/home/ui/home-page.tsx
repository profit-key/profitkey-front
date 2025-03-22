import { AiRecommendSection } from './ai-recommend-section';
import { RankingSection } from './ranking-section';
import { NewsSection } from './news-section';

export function HomePage() {
  return (
    <div>
      <AiRecommendSection />
      <RankingSection />
      <NewsSection />
    </div>
  );
}
