import { useQuery } from '@tanstack/react-query';

import { queryKeyFactory } from '~/api/query/query-key-factory';
import { GetUserTotalBalanceParams, getUserTotalBalance } from '~/api/repository';
import { UserBalance } from '~/api/types';

export const useGetUserTotalBalance = (params: GetUserTotalBalanceParams = {}) => {
  const query = useQuery<UserBalance, Error>({
    queryKey: queryKeyFactory.userTotalBalance(),
    queryFn: ({ signal }) => getUserTotalBalance(params, { signal }),
  });

  return query;
};
