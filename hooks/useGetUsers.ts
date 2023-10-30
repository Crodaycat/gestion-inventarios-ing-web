import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { UsersQuery } from '@/types';
import useSWR, { mutate } from 'swr';

const refetchUsers = async () => {
  await mutate(API_ROUTES.users);
};

const useGetUsers = () => {
  const { data, isLoading, error } = useSWR<UsersQuery>(
    API_ROUTES.users,
    fetcher
  );

  return {
    users: data?.users,
    totalCount: data?.totalCount,
    usersLoading: isLoading,
    usersError: error,
  };
};

export { refetchUsers, useGetUsers };
