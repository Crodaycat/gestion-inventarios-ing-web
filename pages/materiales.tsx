import { withPrivateRoute } from '@/HOC/PrivateRoute';
import { Loading } from '@/components/Loading';
import { useGetMaterials } from '@/hooks/useGetMaterials';
import { useGetUsers } from '@/hooks/useGetUsers';
import { BaseLayout } from '@/layout/BaseLayout';
import { Paginator } from '@/components/Pagination';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { NewMaterial } from '@/components/dialogs/materials/NewMaterial';

const Home = () => {
  const { materials, totalCount, materialsLoading } = useGetMaterials();
  const { users } = useGetUsers();

  const userNameMap = users?.reduce<Record<string, string>>(
    (map, user) => ({ ...map, [user.id]: user.name || '' }),
    {}
  );

  const [page, setPage] = useState<number>(1);

  const [openNewMaterial, setOpenNewMaterial] = useState(false);
  return (
    <BaseLayout>
      <section className='w-full flex flex-col items-center p-4 gap-5'>
        <h1 className='text-4xl'>Gestión de Materiales</h1>

        <Button color='primary' onClick={() => setOpenNewMaterial(true)}>
          Agregar material
        </Button>

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
                  <td>{userNameMap?.[material.userId]}</td>
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
        <NewMaterial open={openNewMaterial} setOpen={setOpenNewMaterial} />
      </section>
    </BaseLayout>
  );
};
export default withPrivateRoute(Home);
