import { Table } from '@/shared/ui/table';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { formatDateString } from './date';
import { INVESTMENT_OPINION } from './utill';
import { type InvestorOpinion } from '@/entities/stock';
import { formatNumberWithCommas } from '@/shared/lib/number';

// 컬럼 정의
const columnHelper = createColumnHelper<InvestorOpinion>();
const columns = [
  columnHelper.accessor('mbcr_name', {
    header: '투자사',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('invt_opnn', {
    header: '의견',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('hts_goal_prc', {
    header: '목표주가',
    cell: (info) => {
      const value = info.getValue();
      return `${formatNumberWithCommas(+value)}원`;
    },
  }),
  columnHelper.accessor('stck_bsop_date', {
    header: '날짜',
    cell: (info) => info.getValue(),
  }),
];

export function InvestorOpinionTable({ data }: { data: InvestorOpinion[] }) {
  // 날짜 형식이 변환된 데이터 생성
  const formattedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      stck_bsop_date: formatDateString(item.stck_bsop_date),
      invt_opnn:
        INVESTMENT_OPINION[
          item.invt_opnn.toUpperCase() as keyof typeof INVESTMENT_OPINION
        ] || item.invt_opnn,
    }));
  }, [data]);

  return (
    <Table
      columns={columns}
      data={formattedData}
      stickyHeader={true}
      ariaLabel="투자사별 의견 테이블"
    />
  );
}
