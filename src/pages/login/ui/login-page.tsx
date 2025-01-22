export function LoginPage() {
  const clientId = '573d719fb6f97ad0b743fe2a1774c7e4';
  const redirectUri = `${window.location.origin}/auth`;

  const onKakaoLoginClick = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  };

  return (
    <div className="flex justify-center items-center flex-col gap-10 min-h-screen">
      <h2>SIGN IN</h2>

      <button
        onClick={onKakaoLoginClick}
        className="border-[1px] border-[#cfcfcf] py-8 px-16"
      >
        카카오 로그인
      </button>
    </div>
  );
}
