import { useMutation } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { kakaoLogin } from '../api/kakao-login';

export function AuthPage() {
  const navigate = useNavigate();
  const [code] = useQueryState('code');

  const { mutate } = useMutation({
    mutationFn: (code: string) => kakaoLogin(code),
    onSuccess: (data) => {
      localStorage.setItem('TOKEN', data.accessToken);
      navigate('/');
    },
  });

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [mutate, code]);

  return <div>Loading...</div>;
}
