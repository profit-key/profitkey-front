import { useQueryState } from 'nuqs';
import { Tab } from './tab';
import AnnouncementList from './announcement-list';
import { Suspense } from 'react';
import { FaqList } from './faq-list';

export function HelpPage() {
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'topic' });

  const onTabChange = (tab: 'topic' | 'faq') => {
    setTab(tab);
  };

  return (
    <div className="mx-auto mt-[100px] max-w-5xl">
      <div className="flex w-full">
        <Tab active={tab === 'topic'} onTabChange={() => onTabChange('topic')}>
          공지사항
        </Tab>
        <Tab active={tab === 'faq'} onTabChange={() => onTabChange('faq')}>
          FAQ
        </Tab>
      </div>

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
