export function NewsCard() {
  return (
    <div className="flex w-48 flex-col gap-3">
      <img
        src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-36 w-48 rounded-md object-cover"
      />
      <h3 className="text-base font-bold text-[#000000]">
        관세 불안에도 굳건한 로봇주
      </h3>
      <span className="text-base text-[#000000]">Naver</span>
    </div>
  );
}
