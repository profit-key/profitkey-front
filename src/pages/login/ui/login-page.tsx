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
    <div className="flex flex-grow justify-center items-center flex-col">
      <img src={login} className="w-[303px] h-[104px]" />

      <div className="flex flex-col gap-4 mt-6">
        <button className="border border-[#747775] rounded-md w-[414px] h-[61px] font-bold text-[#1f1f1f] text-[20px] flex gap-4 justify-center items-center hover:opacity-80">
          <img src={google} className="w-6 h-6" />
          구글 로그인
        </button>
        <button
          onClick={onKakaoLoginClick}
          className="bg-[#FEE500] rounded-md w-[414px] h-[61px] font-bold text-[#000000] text-[20px] flex gap-4 justify-center items-center hover:opacity-80"
        >
          <img src={kakao} className="w-6 h-6" />
          카카오 로그인
        </button>
        <button className="bg-[#03C75A] rounded-md w-[414px] h-[61px] font-bold text-[#ffffff] text-[20px] flex gap-4 justify-center items-center hover:opacity-80">
          <img src={naver} className="w-6 h-6" />
          네이버 로그인
        </button>
      </div>
    </div>
  );
}
