import { z } from 'zod';

export const StockFavorite = z.object({
  userId: z.number(),
  stockCode: z.string(),
});
export type StockFavorite = z.infer<typeof StockFavorite>;

export const UserFavoriteStock = z.boolean();
export type UserFavoriteStock = z.infer<typeof UserFavoriteStock>;

export const FinancialData = z.object({
  stac_yymm: z.string(), // 결산 년월
  grs: z.string(), // 매출액 증가율
  bsop_prfi_inrt: z.string(), // 영업 이익 증가율
  ntin_inrt: z.string(), // 순이익 증가율
  roe_val: z.string(), // ROE 값
  eps: z.string(), // 주당 순이익
  sps: z.string(), // 주당 매출액
  bps: z.string(), // 주당 순자산
  rsrv_rate: z.string(), // 유보 비율(회사 내부 보유 자산 비율)
  lblt_rate: z.string(), // 부채 비율
});
export type FinancialData = z.infer<typeof FinancialData>;

export const FinancialDataResponse = z.object({
  output: z.array(FinancialData),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});
export type FinancialDataResponse = z.infer<typeof FinancialDataResponse>;
