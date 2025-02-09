import { faqQueries } from '@/entities/faq';
import { useSuspenseQuery } from '@tanstack/react-query';

export function FaqList() {
  const { data } = useSuspenseQuery(faqQueries.list({ page: 1, size: 20 }));
  return (
    <div className="border-b border-[#333333] pb-10 pt-6">
      {data.faqList.map((faq) => (
        <div>{faq.question}</div>
      ))}
    </div>
  );
}
