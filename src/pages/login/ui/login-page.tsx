import login from './login.png';
import google from './google.png';
import kakao from './kakao.png';
import naver from './naver.png';

export function LoginPage() {
  const clientId = '573d719fb6f97ad0b743fe2a1774c7e4';
  const redirectUri = `${window.location.origin}/auth`;

  const onKakaoLoginClick = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  };

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <img src={login} className="h-[104px] w-[303px]" />

      <div className="mt-6 flex flex-col gap-4">
        <button className="flex h-[61px] w-[414px] items-center justify-center gap-4 rounded-md border border-[#747775] text-[20px] font-bold text-[#1f1f1f] hover:opacity-80">
          <img src={google} className="h-6 w-6" />
          구글 로그인
        </button>
        <button
          onClick={onKakaoLoginClick}
          className="flex h-[61px] w-[414px] items-center justify-center gap-4 rounded-md bg-[#FEE500] text-[20px] font-bold text-[#000000] hover:opacity-80"
        >
          <img src={kakao} className="h-6 w-6" />
          카카오 로그인
        </button>
        <button className="flex h-[61px] w-[414px] items-center justify-center gap-4 rounded-md bg-[#03C75A] text-[20px] font-bold text-[#ffffff] hover:opacity-80">
          <img src={naver} className="h-6 w-6" />
          네이버 로그인
        </button>
      </div>
    </div>
  );
}
