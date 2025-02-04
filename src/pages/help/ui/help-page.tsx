import { Topic } from './topic';
import { useQueryState } from 'nuqs';

export function HelpPage() {
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'topic' });

  console.log(tab);

  const onTabChange = (tab: 'topic' | 'faq') => {
    setTab(tab);
  };

  return (
    <div className="mt-[100px] flex-grow">
      <div className="flex w-full border-b border-[#d4d4d4]">
        <button
          className="flex flex-1 justify-center pb-6"
          onClick={() => onTabChange('topic')}
        >
          <h2 className="font-bold text-[#d4d4d4]">공지사항</h2>
        </button>
        <button
          className="flex flex-1 justify-center pb-6"
          onClick={() => onTabChange('faq')}
        >
          <h2 className="font-bold text-[#d4d4d4]">FAQ</h2>
        </button>
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
