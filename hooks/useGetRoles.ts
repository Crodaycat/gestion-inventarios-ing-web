import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { RolesQuery } from '@/types';
import useSWR, { mutate } from 'swr';

const refetchRoles = async () => {
  await mutate(API_ROUTES.roles);
};

const useGetRoles = () => {
  const { data, isLoading, error } = useSWR<RolesQuery>(
    API_ROUTES.roles,
    fetcher
  );

  return {
    roles: data?.roles || [],
    rolesLoading: isLoading,
    usersError: error,
  };
};

export { refetchRoles, useGetRoles };
