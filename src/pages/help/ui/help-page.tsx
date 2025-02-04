import { Topic } from './topic';
import { useQueryState } from 'nuqs';
import { Tab } from './tab';

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

      <div className="mt-20 border-b border-t border-[#d4d4d4] p-10">
        <Topic />
        <Topic />
        <Topic />
        <Topic />
        <Topic />
        <div className="flex items-center justify-center gap-8 pt-10">
          {/* NOTE 아이콘 추후 변경 예정 */}
          <span>{'<<'}</span>
          <span className="text-[16px] font-medium text-[#333333]">1</span>
          <span>{'>>'}</span>
        </div>
      </div>
    </div>
  );
}
