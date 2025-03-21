import { useQueryState } from 'nuqs';

import { Suspense } from 'react';
import { FaqList } from './faq-list';
import { Tab, Tabs } from '@/shared/ui';
import { AnnouncementList } from './announcement-list';

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

      <Suspense
        fallback={(() => {
          switch (tab) {
            case 'topic':
              return <AnnouncementList.Loading />;
            case 'faq':
              return <FaqList.Loading />;
            default:
              return null;
          }
        })()}
      >
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
