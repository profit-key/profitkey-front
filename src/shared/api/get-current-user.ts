import { httpClient } from '@/shared/api';
import { User } from './schema';

export const getCurrentUser = async (): Promise<User> => {
  const response = await httpClient.get('/api/users/me');

  return User.parse(response);
};
