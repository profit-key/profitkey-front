import { httpClient } from '@/shared/api';

export const putUserNickname = async (nickname: string) =>
  httpClient.put(`api/users/nickname?nickname=${nickname}`);
