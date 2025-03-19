import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)

  if (diff < 60 * 1) {
    // 1분 미만일땐 방금 전 표기
    return '방금 전';
  }

  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, 'PPP', { locale: ko }).replace(/^\d{4}/, (year) =>
    year.slice(2)
  ); // 날짜 포맷
}

export function formatDateString(date: string): string {
  // 문자열(YYYYMMDD)에서 연도, 월, 일을 추출
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  // Date 객체 생성
  const d = new Date(`${year}-${month}-${day}`);

  // 원하는 형식으로 포맷
  return format(d, 'yyyy.MM.dd');
}
