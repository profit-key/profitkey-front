import { HeartIcon } from './icon.tsx';
import { useState, useEffect } from 'react';

type StockProps = {
  stockCode: string;
};

export function StockHeader({ stockCode }: StockProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [priceColor, setPriceColor] = useState('text-neutral-500');
  const [priceSymbol, setPriceSymbol] = useState('');

  const handleLikeButton = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    // prdy_ctrt 요소의 텍스트 값을 가져옴
    const prdyCtrtElement = document.querySelector('.prdy_ctrt');
    const changeRate = prdyCtrtElement?.textContent;

    // 변동률에 따른 색상과 화살표 설정
    if (changeRate) {
      const rate = parseFloat(changeRate);
      if (rate > 0) {
        setPriceColor('text-[#28B16C]'); // 상승 시 초록색
        setPriceSymbol('▲'); // 상승 화살표
      } else if (rate < 0) {
        setPriceColor('text-[#D94F70]'); // 하락 시 빨간색
        setPriceSymbol('▼'); // 하락 화살표
      } else {
        setPriceColor('text-neutral-500'); // 보합 시 회색
        setPriceSymbol(''); // 보합 시 화살표 없음
      }
    }
  }, []);

  return (
    <div className="mb-8 flex flex-col gap-4">
      <div className="rprs_mrkt_kor_name w-fit rounded-[5px] bg-[#FFB400] px-4 py-1 font-bold text-white">
        KOSPI200
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleLikeButton}
          className="flex items-center justify-center p-1"
        >
          <HeartIcon
            className={`h-8 w-8 ${isLiked ? 'fill-[#D94F70]' : 'fill-neutral-300'}`}
          />
        </button>
        <div className="flex gap-6">
          <h2>
            <span className="text-3xl font-bold">카카오</span> (
            <span className="code text-neutral-600">{stockCode}</span>)
          </h2>
          <div className={`flex items-end gap-2 ${priceColor}`}>
            <p className="text-3xl font-bold">
              <span className="stck_prpr">39,750</span>원
            </p>
            <p className="font-bold">
              {priceSymbol} <span className="prdy_vrss">450</span>
            </p>
            <p className="font-bold">
              (<span className="prdy_ctrt">-1.15</span>%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
