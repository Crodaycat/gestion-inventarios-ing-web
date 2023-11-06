import { withPrivateRoute } from '@/HOC/PrivateRoute';
import { Loading } from '@/components/Loading';
import { useGetMaterials } from '@/hooks/useGetMaterials';
import { BaseLayout } from '@/layout/BaseLayout';
import { Paginator } from '@/components/Pagination';
import { useState } from 'react';

const Home = () => {
  const { materials, totalCount, materialsLoading } = useGetMaterials();
  const [page, setPage] = useState<number>(1);
  
  return (
    <BaseLayout>
      <section className='w-full flex flex-col items-center p-4 gap-5'>
        <h1 className='text-4xl'>Gestión de Materiales</h1>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Saldo</th>
              <th>Creador</th>
            </tr>
          </thead>
          <tbody>
            {materialsLoading && (
              <tr>
                <td colSpan={5}>
                  <div className='flex justify-center items-center'>
                    <Loading /> <span>Cargando...</span>
                  </div>
                </td>
              </tr>
            )}
            {materials?.map((material) => {
              return (
                <tr key={material.id}>
                  <td>{material.id}</td>
                  <td>{material.name}</td>
                  <td>{material.quantity}</td>
                  <td>{material.userId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginator
          currentPage={page}
          itemsPerPage={20}
          totalCount={totalCount}
          updatePage={setPage}
        />
      </section>
    </BaseLayout>
  );
};
export default withPrivateRoute(Home);
