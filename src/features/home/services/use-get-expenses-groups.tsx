import { useQuery } from '@tanstack/react-query';

import { queryKeyFactory } from '~/api/query/query-key-factory';
import { GetExpensesGroupsParams, getExpensesGroups } from '~/api/repository';
import { ExpenseGroup } from '~/api/types';

export const useGetExpensesGroups = (params: GetExpensesGroupsParams = {}) => {
  const query = useQuery<ExpenseGroup[], Error>({
    queryKey: queryKeyFactory.expensesGroups(),
    queryFn: ({ signal }) => getExpensesGroups(params, { signal }),
  });

  return query;
};
