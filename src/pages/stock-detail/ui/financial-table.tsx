/**
 * 재무 지표 테이블 컴포넌트
 *
 * 분기별 재무 지표를 표시하는 테이블 컴포넌트입니다.
 * 첫 번째 열은 고정되어 있어 가로 스크롤 시에도 항상 표시됩니다.
 */

import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '@/shared/ui/table';

// ===== 타입 정의 =====

/**
 * 원본 재무 데이터 인터페이스
 */
interface FinancialData {
  stac_yymm: string; // 기준 년월 (YYYYMM)
  grs: string; // 매출액증가율
  bsop_prfi_inrt: string; // 영업이익증가율
  ntin_inrt: string; // 순이익증가율
  roe_val: string; // ROE
  eps: string; // EPS
  sps: string; // SPS
  bps: string; // BPS
  rsrv_rate: string; // 유보비율
  lblt_rate: string; // 부채비율
}

/**
 * 테이블용 재무 지표 인터페이스
 */
interface FinancialMetric {
  metricName: string; // 지표명
  values: (string | number)[]; // 각 기간에 대한 값들의 배열
  isPercent?: boolean; // 퍼센트 표시 여부
}

// ===== 유틸리티 함수 =====

/**
 * 숫자 문자열을 숫자로 변환
 */
const parseNumber = (value: string): number => {
  return parseFloat(value);
};

/**
 * 숫자를 천 단위 구분자가 있는 문자열로 변환
 */
const formatWithComma = (value: number): string => {
  return value.toLocaleString('ko-KR');
};

/**
 * 재무 지표 테이블 컴포넌트
 */
export const FinancialTable = () => {
  // 샘플 재무 데이터
  const output = useMemo<FinancialData[]>(
    () => [
      {
        stac_yymm: '202412',
        grs: '16.2000',
        bsop_prfi_inrt: '398.3400',
        ntin_inrt: '122.4500',
        roe_val: '9.03',
        eps: '4950.00',
        sps: '44293',
        bps: '57930.00',
        rsrv_rate: '43743.2600',
        lblt_rate: '27.9300',
      },
      {
        stac_yymm: '202409',
        grs: '17.7500',
        bsop_prfi_inrt: '601.0000',
        ntin_inrt: '192.0100',
        roe_val: '9.52',
        eps: '3834.00',
        sps: '44181',
        bps: '55376.00',
        rsrv_rate: '41810.4500',
        lblt_rate: '27.1900',
      },
      {
        stac_yymm: '202406',
        grs: '17.9700',
        bsop_prfi_inrt: '1202.7900',
        ntin_inrt: '403.1900',
        roe_val: '8.95',
        eps: '2394.00',
        sps: '42983',
        bps: '55011.00',
        rsrv_rate: '41533.8400',
        lblt_rate: '26.6600',
      },
      {
        stac_yymm: '202403',
        grs: '12.8200',
        bsop_prfi_inrt: '931.9000',
        ntin_inrt: '328.9800',
        roe_val: '7.40',
        eps: '975.00',
        sps: '42349',
        bps: '53339.00',
        rsrv_rate: '40268.7400',
        lblt_rate: '26.6100',
      },
      {
        stac_yymm: '202312',
        grs: '-14.3300',
        bsop_prfi_inrt: '-84.8600',
        ntin_inrt: '-72.1700',
        roe_val: '4.14',
        eps: '2131.00',
        sps: '38120',
        bps: '52002.00',
        rsrv_rate: '39256.9100',
        lblt_rate: '25.3600',
      },
      {
        stac_yymm: '202309',
        grs: '-17.5200',
        bsop_prfi_inrt: '-90.4200',
        ntin_inrt: '-71.2600',
        roe_val: '3.22',
        eps: '1244.00',
        sps: '37522',
        bps: '52068.00',
        rsrv_rate: '39306.6500',
        lblt_rate: '24.8900',
      },
      {
        stac_yymm: '202306',
        grs: '-20.1500',
        bsop_prfi_inrt: '-95.3600',
        ntin_inrt: '-85.2900',
        roe_val: '1.70',
        eps: '434.00',
        sps: '36437',
        bps: '51385.00',
        rsrv_rate: '38789.9100',
        lblt_rate: '24.8000',
      },
      {
        stac_yymm: '202303',
        grs: '-18.0500',
        bsop_prfi_inrt: '-95.4700',
        ntin_inrt: '-86.1000',
        roe_val: '1.61',
        eps: '206.00',
        sps: '37538',
        bps: '51529.00',
        rsrv_rate: '38898.8300',
        lblt_rate: '26.2100',
      },
      {
        stac_yymm: '202212',
        grs: '8.0900',
        bsop_prfi_inrt: '-15.9900',
        ntin_inrt: '39.4600',
        roe_val: '17.07',
        eps: '8057.00',
        sps: '44494',
        bps: '50817.00',
        rsrv_rate: '38360.2500',
        lblt_rate: '26.4100',
      },
      {
        stac_yymm: '202209',
        grs: '14.1500',
        bsop_prfi_inrt: '3.4500',
        ntin_inrt: '9.4400',
        roe_val: '13.18',
        eps: '4597.00',
        sps: '45494',
        bps: '49387.00',
        rsrv_rate: '37277.7100',
        lblt_rate: '36.3500',
      },
    ],
    []
  );

  // 기간 목록 추출 (연도 형식으로 변환)
  const periods = useMemo(() => {
    return output.map((item) => {
      const year = item.stac_yymm.substring(0, 4);
      const month = item.stac_yymm.substring(4, 6);
      return `${year}.${month}`;
    });
  }, [output]);

  // 지표와 값들 생성
  const metrics = useMemo<FinancialMetric[]>(() => {
    return [
      {
        metricName: '매출액증가율',
        values: output.map((item) => parseNumber(item.grs)),
        isPercent: true,
      },
      {
        metricName: '영업이익증가율',
        values: output.map((item) => parseNumber(item.bsop_prfi_inrt)),
        isPercent: true,
      },
      {
        metricName: '순이익증가율',
        values: output.map((item) => parseNumber(item.ntin_inrt)),
        isPercent: true,
      },
      {
        metricName: 'ROE',
        values: output.map((item) => parseNumber(item.roe_val)),
        isPercent: true,
      },
      {
        metricName: '주당매출액',
        values: output.map((item) => parseNumber(item.sps)),
      },
      {
        metricName: '유보비율',
        values: output.map((item) => parseNumber(item.rsrv_rate)),
        isPercent: true,
      },
      {
        metricName: '부채비율',
        values: output.map((item) => parseNumber(item.lblt_rate)),
        isPercent: true,
      },
    ];
  }, [output]);

  // 동적으로 컬럼 생성
  const columns = useMemo<ColumnDef<FinancialMetric, unknown>[]>(() => {
    // 첫 번째 열: 지표명
    const cols: ColumnDef<FinancialMetric, unknown>[] = [
      {
        accessorKey: 'metricName',
        header: '',
        cell: (info) => (
          <div className="font-bold">{info.getValue() as string}</div>
        ),
      },
    ];

    // 각 기간에 대한 컬럼 추가
    periods.forEach((period, index) => {
      cols.push({
        accessorFn: (row: FinancialMetric) => row.values[index],
        id: `period_${index}`,
        header: period,
        cell: (info) => {
          const value = info.getValue();
          const row = info.row.original;

          if (typeof value === 'number') {
            const formattedValue = formatWithComma(value);
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
