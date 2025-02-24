import { httpClient } from '@/shared/api';
import { z } from 'zod';

const LoginResponse = z.object({
  accessToken: z.string(),
  email: z.string(),
});
type LoginResponse = z.infer<typeof LoginResponse>;

export const kakaoLogin = async (code: string) => {
  const response = await httpClient.get('/api/oauth2/login/kakao', {
    params: { code },
  });

  return LoginResponse.parse(response);
};
