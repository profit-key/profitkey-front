import { z } from 'zod';

// 주식 현재 시세 정보
const StockPriceOutput = z.object({
  iscd_stat_cls_code: z.string(),
  marg_rate: z.string(),
  rprs_mrkt_kor_name: z.string(),
  bstp_kor_isnm: z.string(),
  temp_stop_yn: z.string(),
  oprc_rang_cont_yn: z.string(),
  clpr_rang_cont_yn: z.string(),
  crdt_able_yn: z.string(),
  grmn_rate_cls_code: z.string(),
  elw_pblc_yn: z.string(),
  stck_prpr: z.string(),
  prdy_vrss: z.string(),
  prdy_vrss_sign: z.string(),
  prdy_ctrt: z.string(),
  acml_tr_pbmn: z.string(),
  acml_vol: z.string(),
  prdy_vrss_vol_rate: z.string(),
  stck_oprc: z.string(),
  stck_hgpr: z.string(),
  stck_lwpr: z.string(),
  stck_mxpr: z.string(),
  stck_llam: z.string(),
  stck_sdpr: z.string(),
  wghn_avrg_stck_prc: z.string(),
  hts_frgn_ehrt: z.string(),
  frgn_ntby_qty: z.string(),
  pgtr_ntby_qty: z.string(),
  pvt_scnd_dmrs_prc: z.string(),
  pvt_frst_dmrs_prc: z.string(),
  pvt_pont_val: z.string(),
  pvt_frst_dmsp_prc: z.string(),
  pvt_scnd_dmsp_prc: z.string(),
  dmrs_val: z.string(),
  dmsp_val: z.string(),
  cpfn: z.string(),
  rstc_wdth_prc: z.string(),
  stck_fcam: z.string(),
  stck_sspr: z.string(),
  aspr_unit: z.string(),
  hts_deal_qty_unit_val: z.string(),
  lstn_stcn: z.string(),
  hts_avls: z.string(),
  per: z.string(),
  pbr: z.string(),
  stac_month: z.string(),
  vol_tnrt: z.string(),
  eps: z.string(),
  bps: z.string(),
  d250_hgpr: z.string(),
  d250_hgpr_date: z.string(),
  d250_hgpr_vrss_prpr_rate: z.string(),
  d250_lwpr: z.string(),
  d250_lwpr_date: z.string(),
  d250_lwpr_vrss_prpr_rate: z.string(),
  stck_dryy_hgpr: z.string(),
  dryy_hgpr_vrss_prpr_rate: z.string(),
  dryy_hgpr_date: z.string(),
  stck_dryy_lwpr: z.string(),
  dryy_lwpr_vrss_prpr_rate: z.string(),
  dryy_lwpr_date: z.string(),
  w52_hgpr: z.string(),
  w52_hgpr_vrss_prpr_ctrt: z.string(),
  w52_hgpr_date: z.string(),
  w52_lwpr: z.string(),
  w52_lwpr_vrss_prpr_ctrt: z.string(),
  w52_lwpr_date: z.string(),
  whol_loan_rmnd_rate: z.string(),
  ssts_yn: z.string(),
  stck_shrn_iscd: z.string(),
  fcam_cnnm: z.string(),
  cpfn_cnnm: z.string(),
  frgn_hldn_qty: z.string(),
  vi_cls_code: z.string(),
  ovtm_vi_cls_code: z.string(),
  last_ssts_cntg_qty: z.string(),
  invt_caful_yn: z.string(),
  mrkt_warn_cls_code: z.string(),
  short_over_yn: z.string(),
  sltr_yn: z.string(),
});

// 주식 현재 시세 API 응답 전체 구조
export const StockPriceResponse = z.object({
  output: StockPriceOutput,
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

// 주식 검색 응답 구조
export const StockSearchResponse = z.object({
  stockCode: z.string(),
  stockName: z.string(),
  marketCategory: z.string(),
});

// 주식 요약 정보
export const StockSummary = z.object({
  code: z.string(),
  mrktName: z.string(),
  name: z.string(),
  price: z.string(),
  change: z.string(),
  changeRate: z.string(),
});

// 주식 상세 정보
export const StockDetailResponse = z.object({
  stockCode: z.object({
    stockCode: z.string(),
    stockName: z.string(),
    marketCategory: z.string(),
  }),
  baseDate: z.string(),
  division: z.string(),
  endingPrice: z.number(),
  openingPrice: z.number(),
  prdyCtrt: z.number(),
  highPrice: z.number(),
  lowPrice: z.number(),
  tradingVolume: z.number(),
  tradingValue: z.number(),
  marketCap: z.number(),
  fiftyTwoWeekHigh: z.number(),
  fiftyTwoWeekLow: z.number(),
  per: z.number(),
  eps: z.number(),
  pbr: z.number(),
  bps: z.number(),
  diviRate: z.number(),
  diviAmt: z.number(),
});

export type StockPriceResponse = z.infer<typeof StockPriceResponse>;
export type StockSearchResponse = z.infer<typeof StockSearchResponse>;
export type StockSummary = z.infer<typeof StockSummary>;
export type StockDetailResponse = z.infer<typeof StockDetailResponse>;

export const InvestorOpinion = z.object({
  stck_bsop_date: z.string(),
  invt_opnn: z.string(),
  invt_opnn_cls_code: z.string(),
  rgbf_invt_opnn: z.string(),
  rgbf_invt_opnn_cls_code: z.string(),
  mbcr_name: z.string(),
  hts_goal_prc: z.string(),
  stck_prdy_clpr: z.string(),
  stck_nday_esdg: z.string(),
  nday_dprt: z.string(),
  stft_esdg: z.string(),
  dprt: z.string(),
});
export type InvestorOpinion = z.infer<typeof InvestorOpinion>;

export const InvestorOpinionResponse = z.object({
  output: z.array(InvestorOpinion),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});
export type InvestorOpinionResponse = z.infer<typeof InvestorOpinionResponse>;

export const StockCode = z.object({
  stockCode: z.string(),
  stockName: z.string(),
  marketCategory: z.string(),
});
export type StockCode = z.infer<typeof StockCode>;
