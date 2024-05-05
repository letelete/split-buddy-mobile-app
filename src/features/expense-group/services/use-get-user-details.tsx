import { useQuery } from '@tanstack/react-query';

import { queryKeyFactory } from '~/api/query/query-key-factory';
import { GetUserDetailsParams, getUserDetails } from '~/api/repository';

export const useGetUserDetails = (params: GetUserDetailsParams = {}) => {
  const query = useQuery({
    queryKey: queryKeyFactory.userDetails(),
    queryFn: ({ signal }) => getUserDetails(params, { signal }),
  });

  return query;
};
