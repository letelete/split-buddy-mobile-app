import {
  QueryClientProvider as RQQueryClientProvider,
  QueryClientProviderProps as RQQueryClientProviderProps,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import { useRefetchOnAppFocus } from '~/api/query/hooks/use-refetch-on-app-focus';
import { useRefetchOnReconnectToNetwork } from '~/api/query/hooks/use-refetch-on-reconnect-to-network';
import { queryClient } from '~/api/query/query';

export interface QueryClientProviderProps extends RQQueryClientProviderProps {}

const QueryClientProvider = ({ children, ...rest }: Omit<QueryClientProviderProps, 'client'>) => {
  return (
    <RQQueryClientProvider {...rest} client={queryClient}>
      <QueryClientProviderInitializer>{children}</QueryClientProviderInitializer>
    </RQQueryClientProvider>
  );
};

QueryClientProvider.displayName = 'QueryClientProvider';

export { QueryClientProvider };

const QueryClientProviderInitializer = ({ children }: PropsWithChildren) => {
  useRefetchOnReconnectToNetwork();
  useRefetchOnAppFocus();

  return <>{children}</>;
};

QueryClientProviderInitializer.displayName = 'QueryClientProviderInitializer';
