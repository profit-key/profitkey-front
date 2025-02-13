export function NewsPage() {
  return (
    <div className="mx-auto mt-[100px] max-w-5xl">
      <h2 className="text-[40px] font-bold text-[#000000]">최신뉴스</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex w-48 flex-col gap-3" key={index}>
            <img
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="h-36 w-48 rounded-md object-cover"
            />
            <h3 className="text-[24px] font-bold text-[#000000]">
              관세 불안에도 굳건한 로봇주
            </h3>
            <span className="text-[24px] text-[#000000]">Naver</span>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-[40px] font-bold text-[#000000]">전체뉴스</h2>
      <div className="mt-8 border-b border-t-4 border-[#333333]">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className="flex items-center justify-between border-b border-[#d4d4d4] px-8 py-6"
            key={index}
          >
            <h3 className="text-[16px] font-bold text-[#333333]">
              “코스피·코스닥 장 초반 강세…외국인 매수세 확대”
            </h3>
            <time className="text-[16px] font-medium text-[#333333]">
              2025-02-02
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}
