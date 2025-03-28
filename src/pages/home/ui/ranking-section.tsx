import { HtsTopSection } from './hts-top-section';
import { MarketCapSection } from './market-cap-section';
import { MarketInfoSection } from './market-info-section';

export function RankingSection() {
  return (
    <div className="border-b border-[#d4d4d4] py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-3 gap-x-2">
        <MarketCapSection />
        <HtsTopSection />
        <MarketInfoSection />
      </div>
    </div>
  );
}
