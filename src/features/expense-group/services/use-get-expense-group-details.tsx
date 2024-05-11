import { useQuery } from '@tanstack/react-query';

import { queryKeyFactory } from '~/api/query/query-key-factory';
import { GetExpenseGroupDetailsParams, getExpenseGroupDetails } from '~/api/repository';

export const useGetExpenseGroupDetails = (params: GetExpenseGroupDetailsParams) => {
  const query = useQuery({
    queryKey: queryKeyFactory.expenseGroup(params.groupId),
    queryFn: ({ signal }) => getExpenseGroupDetails(params, { signal }),
  });

  return query;
};
