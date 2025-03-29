/**
 * 재무 지표 테이블 컴포넌트
 *
 * 분기별 재무 지표를 표시하는 테이블 컴포넌트입니다.
 * 첫 번째 열은 고정되어 있어 가로 스크롤 시에도 항상 표시됩니다.
 */

import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '@/shared/ui/table';
import { useQuery } from '@tanstack/react-query';
import { financialDataQueries } from '../api/query';

type FinancialMetric = {
  metricName: string; // 지표명
  values: (string | number)[]; // 각 기간에 대한 값들의 배열
  isPercent?: boolean; // 퍼센트 표시 여부
};

export const FinancialTable = ({ stockCode }: { stockCode: string }) => {
  const { data: financialData } = useQuery({
    ...financialDataQueries.financialData(stockCode),
  });

  // 기간 목록 추출 (연도 형식으로 변환)
  const periods = useMemo(() => {
    return financialData?.output.map((item) => {
      const year = item.stac_yymm.substring(0, 4);
      const month = item.stac_yymm.substring(4, 6);
      return `${year}.${month}`;
    });
  }, [financialData]);

  // 지표와 값들 생성
  const metrics = useMemo(() => {
    return [
      {
        metricName: '매출액증가율',
        values: financialData?.output.map((item) => parseFloat(item.grs)) ?? [],
        isPercent: true,
      },
      {
        metricName: '영업이익증가율',
        values:
          financialData?.output.map((item) =>
            parseFloat(item.bsop_prfi_inrt)
          ) ?? [],
        isPercent: true,
      },
      {
        metricName: '순이익증가율',
        values:
          financialData?.output.map((item) => parseFloat(item.ntin_inrt)) ?? [],
        isPercent: true,
      },
      {
        metricName: 'ROE',
        values:
          financialData?.output.map((item) => parseFloat(item.roe_val)) ?? [],
        isPercent: true,
      },
      {
        metricName: '주당매출액',
        values: financialData?.output.map((item) => parseFloat(item.sps)) ?? [],
      },
      {
        metricName: '유보비율',
        values:
          financialData?.output.map((item) => parseFloat(item.rsrv_rate)) ?? [],
        isPercent: true,
      },
      {
        metricName: '부채비율',
        values:
          financialData?.output.map((item) => parseFloat(item.lblt_rate)) ?? [],
        isPercent: true,
      },
    ];
  }, [financialData]);

  // 동적으로 컬럼 생성
  const columns = useMemo(() => {
    // 첫 번째 열: 지표명
    const cols: ColumnDef<FinancialMetric, string | number | boolean>[] = [
      {
        accessorKey: 'metricName',
        header: '',
        cell: (info) => <div className="font-bold">{info.getValue()}</div>,
      },
    ];

    // 각 기간에 대한 컬럼 추가
    periods?.forEach((period, index) => {
      cols.push({
        accessorFn: (row: FinancialMetric) => row.values[index],
        id: `period_${index}`,
        header: period,
        cell: (info) => {
          const value = info.getValue();
          const row = info.row.original;

          if (typeof value === 'number') {
            const formattedValue = value.toLocaleString();
            return row.isPercent ? `${formattedValue} %` : formattedValue;
          }

          return value;
        },
      });
    });

    return cols;
  }, [periods]);

  return (
    <Table
      columns={columns}
      data={metrics}
      stickyColumnId="metricName"
      stickyHeader={true}
      ariaLabel="재무 지표 테이블"
    />
  );
};
