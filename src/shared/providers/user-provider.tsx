import { userQueries } from '@/shared/api/query';
import { User } from '@/shared/api/schema';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, type PropsWithChildren } from 'react';

const CurrentUserContext = createContext<User | null>(null);

export function UserProvider({ children }: PropsWithChildren) {
  const { data: user } = useQuery(userQueries.me());

  return (
    <CurrentUserContext.Provider value={user ?? null}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(CurrentUserContext);
};
