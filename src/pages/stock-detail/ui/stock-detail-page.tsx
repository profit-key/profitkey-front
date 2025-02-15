import { useParams } from 'react-router';
import { useQueryState } from 'nuqs';
import { Tab } from './tab';
import { StockAnalyst } from './stock-analyst';
import { Community } from './community';

export function StockDetailPage() {
  const { stockCode } = useParams();

  const [tab, setTab] = useQueryState('tab', { defaultValue: 'analyst' });

  const onTabChange = (tab: 'analyst' | 'community') => {
    setTab(tab);
  };

  return (
    <div className="mx-auto my-[100px] max-w-5xl flex-grow">
      <h2>주식 ({stockCode})</h2>
      <menu className="flex w-full">
        <Tab
          active={tab === 'analyst'}
          onTabChange={() => onTabChange('analyst')}
        >
          종목분석
        </Tab>
        <Tab
          active={tab === 'community'}
          onTabChange={() => onTabChange('community')}
        >
          커뮤니티
        </Tab>
      </menu>
      <div className="mt-14">
        {tab === 'analyst' && <StockAnalyst />}
        {tab === 'community' && <Community />}
      </div>
    </div>
  );
}
