import { faqQueries } from '@/entities/faq';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui';

import { useSuspenseQuery } from '@tanstack/react-query';

export function FaqList() {
  const { data } = useSuspenseQuery(faqQueries.list({ page: 1, size: 20 }));

  return (
    <div className="border-b border-[#333333] pb-10 pt-6">
      <Accordion type="single" collapsible>
        {data.faqList.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id + ''}
            className="border-b border-[#d4d4d4]"
          >
            <AccordionTrigger className="px-10 py-6 text-[16px] font-bold text-[#333333]">
              Q. {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-16 py-6 text-[16px] font-bold text-[#333333]">
              A. {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-10 flex justify-end">
        <a
          href="mailto:profitkey@help.com"
          className="rounded-md bg-[#333333] px-8 py-4 text-[20px] font-bold text-[#fff]"
        >
          1:1 문의
        </a>
      </div>
    </div>
  );
}
