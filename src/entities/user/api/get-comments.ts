import { httpClient } from '@/shared/api';
import { UserComment } from './schema';
import { z } from 'zod';

export const getComments = async (): Promise<UserComment[]> => {
  const response = await httpClient.get('/api/users/comments');

  return z.array(UserComment).parse(response);
};
