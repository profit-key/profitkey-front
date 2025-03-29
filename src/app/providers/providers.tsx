import { UserProvider } from '@/shared/providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { StockCodeProvider } from '@/shared/providers';

import { type PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <UserProvider>
          <StockCodeProvider>{children}</StockCodeProvider>
        </UserProvider>
      </NuqsAdapter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
