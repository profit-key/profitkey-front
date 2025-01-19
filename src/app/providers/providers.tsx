import { NuqsAdapter } from 'nuqs/adapters/react';

import { type PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
