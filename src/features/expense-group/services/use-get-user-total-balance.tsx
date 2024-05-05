import { useQuery } from '@tanstack/react-query';

import { queryKeyFactory } from '~/api/query/query-key-factory';
import { GetUserTotalBalanceParams, getUserTotalBalance } from '~/api/repository';

export const useGetUserTotalBalance = (params: GetUserTotalBalanceParams = {}) => {
  const query = useQuery({
    queryKey: queryKeyFactory.userTotalBalance(),
    queryFn: ({ signal }) => getUserTotalBalance(params, { signal }),
  });

  return query;
};
