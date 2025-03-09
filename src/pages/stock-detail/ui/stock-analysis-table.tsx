import { useState } from 'react';

type StockAnalysisData = {
  yearHighPrice: number;
  yearLowPrice: number;
  per: number;
  pbr: number;
  eps: number;
  bps: number;
  highPriceRatio: number;
  lowPriceRatio: number;
  dividend: number;
  dividendYield: number;
};

interface StockAnalysisTableProps {
  data: StockAnalysisData;
}

interface StockAnalysisRowProps {
  leftLabel: string;
  leftValue: string | number;
  rightLabel: string;
  rightValue: string | number;
  showQuestionMark?: boolean;
  leftValueUnit?: string;
  rightValueUnit?: string;
  leftTooltip?: string;
  rightTooltip?: string;
}

interface TooltipProps {
  text: string;
  isVisible: boolean;
}

function Tooltip({ text, isVisible }: TooltipProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute left-[-20px] top-[30px] z-10 h-14 w-[600px]">
      <div data-svg-wrapper className="absolute left-5 top-0">
        <svg
          width="29"
          height="12"
          viewBox="0 0 29 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.4999 0L28.7893 12H0.210449L14.4999 0Z" fill="#D4D4D4" />
        </svg>
      </div>
      <div className="absolute left-0 top-[11.20px] inline-flex h-12 items-center justify-center gap-2.5 rounded-[5px] bg-neutral-300 p-2.5">
        <div className="text-xs font-normal text-[#333333]">{text}</div>
      </div>
    </div>
  );
}

function QuestionMark({ tooltip }: { tooltip?: string }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  if (!tooltip) return null;

  return (
    <div
      className="relative flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-neutral-300"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <span className="text-xs font-bold text-[#646464]">?</span>
      <Tooltip text={tooltip} isVisible={isTooltipVisible} />
    </div>
  );
}

function StockAnalysisRow({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  showQuestionMark = false,
  leftValueUnit = '',
  rightValueUnit = leftValueUnit,
  leftTooltip,
  rightTooltip,
}: StockAnalysisRowProps) {
  const Label = ({ text, tooltip }: { text: string; tooltip?: string }) => (
    <div className="mr-2 flex items-center justify-start gap-4">
      <div className="text-base font-medium text-black">{text}</div>
      {showQuestionMark && <QuestionMark tooltip={tooltip} />}
    </div>
  );

  const Value = ({
    value,
    unit,
  }: {
    value: string | number;
    unit?: string;
  }) => (
    <div className="text-base font-medium text-black">
      {value}
      {unit}
    </div>
  );

  return (
    <div className="inline-flex h-14 w-full items-start justify-center gap-10 bg-[#f2f2f2] px-6 pb-5 pt-5">
      <div className="inline-flex flex-1 items-center justify-between self-stretch">
        <Label text={leftLabel} tooltip={leftTooltip} />
        <Value value={leftValue} unit={leftValueUnit} />
      </div>
      <div className="inline-flex shrink grow basis-0 items-center justify-between self-stretch">
        <Label text={rightLabel} tooltip={rightTooltip} />
        <Value value={rightValue} unit={rightValueUnit} />
      </div>
    </div>
  );
}

export function StockAnalysisTable({ data }: StockAnalysisTableProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  return (
    <div className="flex w-full flex-col items-start justify-start gap-5">
      <StockAnalysisRow
        leftLabel="52주 최고가"
        leftValue={formatNumber(data.yearHighPrice)}
        rightLabel="52주 최저가"
        rightValue={formatNumber(data.yearLowPrice)}
        leftValueUnit="원"
        rightValueUnit="원"
      />
      <StockAnalysisRow
        leftLabel="PER"
        leftValue={data.per.toFixed(2)}
        rightLabel="PBR"
        rightValue={data.pbr.toFixed(2)}
        showQuestionMark={true}
        leftValueUnit="배"
        rightValueUnit="배"
        leftTooltip="주가를 주당 순이익(EPS)으로 나눈 값으로, 기업의 주식이 수익 대비 얼마나 높은 가격에 거래되는지를 나타내는 지표"
        rightTooltip="주가를 주당 순자산(BPS)으로 나눈 값으로, 기업의 주식이 순자산 대비 얼마나 높은 가격에 거래되는지를 나타내는 지표"
      />
      <StockAnalysisRow
        leftLabel="EPS"
        leftValue={formatNumber(data.eps)}
        rightLabel="BPS"
        rightValue={formatNumber(data.bps)}
        showQuestionMark={true}
        leftTooltip="주당순이익(Earnings Per Share)으로, 기업의 당기순이익을 발행주식수로 나눈 값"
        rightTooltip="주당순자산(Book-value Per Share)으로, 기업의 순자산을 발행주식수로 나눈 값"
      />
      <StockAnalysisRow
        leftLabel="연중 최대가 대비 현재가 비율"
        leftValue={data.highPriceRatio}
        rightLabel="연중 최저가 대비 현재가 비율"
        rightValue={data.lowPriceRatio}
        leftValueUnit="%"
        rightValueUnit="%"
      />
      <StockAnalysisRow
        leftLabel="배당금"
        leftValue={formatNumber(data.dividend)}
        rightLabel="배당수익률"
        rightValue={data.dividendYield}
        showQuestionMark={true}
        leftValueUnit="원"
        rightValueUnit="%"
        leftTooltip="주주에게 지급되는 1주당 이익 분배금"
        rightTooltip="주가 대비 배당금의 비율로, 투자금액 대비 배당금의 수익률을 나타냄"
      />
    </div>
  );
}
