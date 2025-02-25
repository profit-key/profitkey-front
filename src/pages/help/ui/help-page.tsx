import { useQueryState } from 'nuqs';
import AnnouncementList from './announcement-list';
import { Suspense } from 'react';
import { FaqList } from './faq-list';
import { Tab, Tabs } from '@/shared/ui';

export function HelpPage() {
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'topic' });

  const onTabChange = (tab: 'topic' | 'faq') => {
    setTab(tab);
  };

  return (
    <div className="mx-auto mt-[100px] max-w-5xl">
      <Tabs>
        <Tab
          selected={tab === 'topic'}
          onTabChange={() => onTabChange('topic')}
        >
          공지사항
        </Tab>
        <Tab selected={tab === 'faq'} onTabChange={() => onTabChange('faq')}>
          FAQ
        </Tab>
      </Tabs>

      <Suspense>
        {(() => {
          switch (tab) {
            case 'topic':
              return <AnnouncementList />;
            case 'faq':
              return <FaqList />;
            default:
              return null;
          }
        })()}
      </Suspense>
    </div>
  );
}
