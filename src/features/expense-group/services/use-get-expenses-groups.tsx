import { useQuery } from '@tanstack/react-query';

import { queryKeyFactory } from '~/api/query/query-key-factory';
import { GetExpensesGroupsParams, getExpensesGroups } from '~/api/repository';

export const useGetExpensesGroups = (params: GetExpensesGroupsParams = {}) => {
  const query = useQuery({
    queryKey: queryKeyFactory.expensesGroups(),
    queryFn: ({ signal }) => getExpensesGroups(params, { signal }),
  });

  return query;
};
