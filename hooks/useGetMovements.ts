import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { MovementsQuery } from '@/types';
import useSWR, { mutate } from 'swr';

const refetchMovements = async (materialId:string) => {
  await mutate(`${API_ROUTES.movements}/${materialId}`);
};

const useGetMovements = (materialId:string) => {
  const { data, isLoading } = useSWR<MovementsQuery>(
    `${API_ROUTES.movements}/${materialId}`,
    fetcher
  );

  return {
    movements: data?.movements,
    totalCount: data?.totalCount,
    movementsLoading: isLoading
  };
};

export { refetchMovements, useGetMovements };
