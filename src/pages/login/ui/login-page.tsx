import login from './login.png';

export function LoginPage() {
  const clientId = '573d719fb6f97ad0b743fe2a1774c7e4';
  const redirectUri = `${window.location.origin}/auth`;

  const onKakaoLoginClick = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  };

  return (
    <div className="flex flex-grow justify-center items-center flex-col">
      <img src={login} className="w-[303px] h-[104px]" />

      <div className="flex flex-col gap-2 mt-6">
        <button className="border-[1px] border-[#747775] rounded-md w-[414px] h-[61px] font-bold text-[#1f1f1f] text-[20px]">
          구글 로그인
        </button>
        <button
          onClick={onKakaoLoginClick}
          className="bg-[#FEE500] rounded-md w-[414px] h-[61px] font-bold text-[#000000] text-[20px]"
        >
          카카오 로그인
        </button>
        <button className="bg-[#03C75A] rounded-md w-[414px] h-[61px] font-bold text-[#ffffff] text-[20px]">
          네이버 로그인
        </button>
      </div>
    </div>
  );
}
