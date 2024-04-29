import { QueryClient } from '@tanstack/react-query';

import { timeInMs } from '~/utils/time';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: timeInMs.minute * 1,
    },
  },
});
