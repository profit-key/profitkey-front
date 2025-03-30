import { useParams } from 'react-router';
import { useQueryState } from 'nuqs';
import { Tab, Tabs } from '@/shared/ui';
import { StockAnalyst } from './stock-analyst';
import { Community } from './community';
import { StockHeader } from './stock-header';
import { Suspense } from 'react';

export function StockDetailPage() {
  const { stockCode } = useParams<{ stockCode: string }>();

  const [tab, setTab] = useQueryState('tab', { defaultValue: 'analyst' });

  const onTabChange = (tab: 'analyst' | 'community') => {
    setTab(tab);
  };

  return (
    <div className="mx-auto my-[100px] max-w-5xl flex-grow">
      <Suspense fallback={<StockHeader.Loading />}>
        <StockHeader stockCode={stockCode ?? '035720'} />
      </Suspense>

      <Tabs>
        <Tab
          selected={tab === 'analyst'}
          onTabChange={() => onTabChange('analyst')}
        >
          종목분석
        </Tab>
        <Tab
          selected={tab === 'community'}
          onTabChange={() => onTabChange('community')}
        >
          커뮤니티
        </Tab>
      </Tabs>
      <div className="mt-14">
        {tab === 'analyst' && (
          <Suspense fallback={<StockAnalyst.Loading />}>
            <StockAnalyst stockCode={stockCode ?? '035720'} />
          </Suspense>
        )}
        {tab === 'community' && <Community stockCode={stockCode ?? '035720'} />}
      </div>
    </div>
  );
}
