import { Link } from 'react-router';

export function Topic() {
  return (
    <Link
      to="#"
      className="flex items-center justify-between border-b border-[#d4d4d4] px-8 py-6"
    >
      <h3 className="text-[16px] font-medium text-[#333333]">
        [안내] PROFITKEY 레터 수신 동의 신청필요 안내
      </h3>
      <time className="text-[16px] font-medium text-[#333333]">2025-02-02</time>
    </Link>
  );
}
