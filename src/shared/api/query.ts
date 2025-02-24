import { queryOptions } from '@tanstack/react-query';
import { getCurrentUser } from './get-current-user';

export const userQueries = {
  all: () => ['user', 'all'],
  me: () =>
    queryOptions({
      queryKey: [...userQueries.all(), 'me'],
      queryFn: () => getCurrentUser(),
    }),
};
