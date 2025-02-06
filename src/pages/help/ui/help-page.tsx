import { useQueryState } from 'nuqs';
import { Tab } from './tab';
import AnnouncementList from './announcement-list';

export function HelpPage() {
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'topic' });

  const onTabChange = (tab: 'topic' | 'faq') => {
    setTab(tab);
  };

  return (
    <div className="mx-auto mt-[100px] max-w-5xl flex-grow">
      <div className="flex w-full">
        <Tab active={tab === 'topic'} onTabChange={() => onTabChange('topic')}>
          공지사항
        </Tab>
        <Tab active={tab === 'faq'} onTabChange={() => onTabChange('faq')}>
          FAQ
        </Tab>
      </div>

      <AnnouncementList />
    </div>
  );
}
