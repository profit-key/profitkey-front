import { Table } from '@/shared/ui/table';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

// 데이터 타입 정의
interface InvestorOpinion {
  stck_bsop_date: string;
  invt_opnn: string;
  invt_opnn_cls_code: string;
  rgbf_invt_opnn: string;
  rgbf_invt_opnn_cls_code: string;
  mbcr_name: string;
  hts_goal_prc: string;
  stck_prdy_clpr: string;
  stck_nday_esdg: string;
  nday_dprt: string;
  stft_esdg: string;
  dprt: string;
}

// 샘플 데이터
const data: InvestorOpinion[] = [
  {
    stck_bsop_date: '20240502',
    invt_opnn: 'BUY',
    invt_opnn_cls_code: '2',
    rgbf_invt_opnn: 'BUY',
    rgbf_invt_opnn_cls_code: '3',
    mbcr_name: '다올투자',
    hts_goal_prc: '105000',
    stck_prdy_clpr: '77500',
    stck_nday_esdg: '-27500',
    nday_dprt: '-26.19',
    stft_esdg: '-51300',
    dprt: '-48.86',
  },
  {
    stck_bsop_date: '20240502',
    invt_opnn: 'BUY',
    invt_opnn_cls_code: '2',
    rgbf_invt_opnn: 'BUY',
    rgbf_invt_opnn_cls_code: '3',
    mbcr_name: '하이투자',
    hts_goal_prc: '95000',
    stck_prdy_clpr: '77500',
    stck_nday_esdg: '-17500',
    nday_dprt: '-18.42',
    stft_esdg: '-41300',
    dprt: '-43.47',
  },
  {
    stck_bsop_date: '20240502',
    invt_opnn: 'BUY',
    invt_opnn_cls_code: '2',
    rgbf_invt_opnn: 'BUY',
    rgbf_invt_opnn_cls_code: '3',
    mbcr_name: 'KB',
    hts_goal_prc: '120000',
    stck_prdy_clpr: '77500',
    stck_nday_esdg: '-42500',
    nday_dprt: '-35.42',
    stft_esdg: '-66300',
    dprt: '-55.25',
  },
  {
    stck_bsop_date: '20240502',
    invt_opnn: '매수',
    invt_opnn_cls_code: '2',
    rgbf_invt_opnn: '매수',
    rgbf_invt_opnn_cls_code: '3',
    mbcr_name: '신한투자증권',
    hts_goal_prc: '110000',
    stck_prdy_clpr: '77500',
    stck_nday_esdg: '-32500',
    nday_dprt: '-29.55',
    stft_esdg: '-56300',
    dprt: '-51.18',
  },
  {
    stck_bsop_date: '20240412',
    invt_opnn: 'BUY',
    invt_opnn_cls_code: '2',
    rgbf_invt_opnn: 'BUY',
    rgbf_invt_opnn_cls_code: '3',
    mbcr_name: '현대차',
    hts_goal_prc: '100000',
    stck_prdy_clpr: '84100',
    stck_nday_esdg: '-15900',
    nday_dprt: '-15.90',
    stft_esdg: '-46300',
    dprt: '-46.30',
  },
  {
    stck_bsop_date: '20240408',
    invt_opnn: '매수',
    invt_opnn_cls_code: '2',
    rgbf_invt_opnn: '매수',
    rgbf_invt_opnn_cls_code: '3',
    mbcr_name: 'IBK투자',
    hts_goal_prc: '110000',
    stck_prdy_clpr: '84500',
    stck_nday_esdg: '-25500',
    nday_dprt: '-23.18',
    stft_esdg: '-56300',
    dprt: '-51.18',
  },
  {
    stck_bsop_date: '20240408',
    invt_opnn: 'BUY',
    invt_opnn_cls_code: '2',
    rgbf_invt_opnn: 'BUY',
    rgbf_invt_opnn_cls_code: '3',
    mbcr_name: '한화투자',
    hts_goal_prc: '115000',
    stck_prdy_clpr: '84500',
    stck_nday_esdg: '-30500',
    nday_dprt: '-26.52',
    stft_esdg: '-61300',
    dprt: '-53.30',
  },
  {
    stck_bsop_date: '20240408',
    invt_opnn: '매수',
    invt_opnn_cls_code: '2',
    rgbf_invt_opnn: '매수',
    rgbf_invt_opnn_cls_code: '3',
    mbcr_name: '신영',
    hts_goal_prc: '100000',
    stck_prdy_clpr: '84500',
    stck_nday_esdg: '-15500',
    nday_dprt: '-15.50',
    stft_esdg: '-46300',
    dprt: '-46.30',
  },
  {
    stck_bsop_date: '20240405',
    invt_opnn: '매수',
    invt_opnn_cls_code: '2',
    rgbf_invt_opnn: '매수',
    rgbf_invt_opnn_cls_code: '3',
    mbcr_name: '한국투자',
    hts_goal_prc: '120000',
    stck_prdy_clpr: '85300',
    stck_nday_esdg: '-34700',
    nday_dprt: '-28.92',
    stft_esdg: '-66300',
    dprt: '-55.25',
  },
  {
    stck_bsop_date: '20240404',
    invt_opnn: 'BUY',
    invt_opnn_cls_code: '2',
    rgbf_invt_opnn: 'BUY',
    rgbf_invt_opnn_cls_code: '3',
    mbcr_name: '하이투자',
    hts_goal_prc: '99000',
    stck_prdy_clpr: '84100',
    stck_nday_esdg: '-14900',
    nday_dprt: '-15.05',
    stft_esdg: '-45300',
    dprt: '-45.76',
  },
];

/**
 * 숫자 문자열에 천 단위 구분자 추가
 */
const formatWithComma = (value: string): string => {
  const num = parseInt(value, 10);
  return num.toLocaleString();
};

const formatDate = (value: string): string => {
  const year = value.substring(0, 4);
  const month = value.substring(4, 6);
  const day = value.substring(6, 8);
  return `${year}.${month}.${day}`;
};

// 컬럼 정의
const columnHelper = createColumnHelper<InvestorOpinion>();
const columns = [
  columnHelper.accessor('mbcr_name', {
    header: '투자사',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('rgbf_invt_opnn', {
    header: '의견',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('hts_goal_prc', {
    header: '목표주가',
    cell: (info) => {
      const value = info.getValue();
      return `${formatWithComma(value)}원`;
    },
  }),
  columnHelper.accessor('stck_bsop_date', {
    header: '날짜',
    cell: (info) => info.getValue(),
  }),
];

export function InvestorOpinionTable() {
  // 날짜 형식이 변환된 데이터 생성
  const formattedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      stck_bsop_date: formatDate(item.stck_bsop_date),
    }));
  }, []);

  return (
    <Table
      columns={columns}
      data={formattedData}
      stickyHeader={true} // 헤더만 고정
      ariaLabel="투자사별 의견 테이블"
    />
  );
}
