import { UserProvider } from '@/shared/providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { OverlayProvider } from 'overlay-kit';

import { type PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <OverlayProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <UserProvider>{children}</UserProvider>
        </NuqsAdapter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </OverlayProvider>
  );
}
