import { Topic } from './topic';
import { useQueryState } from 'nuqs';
import { Tab } from './tab';

export function HelpPage() {
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'topic' });

  console.log(tab);

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

      <div className="mt-20 border-b border-t border-[#d4d4d4] p-10">
        <Topic />
        <Topic />
        <Topic />
        <Topic />
        <Topic />
      </div>
    </div>
  );
}
