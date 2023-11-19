import { Loading } from '@/components/Loading';
import { Paginator } from '@/components/Pagination';
import { ApplicationContext } from '@/context/ApplicationContext';
import { useGetUsers } from '@/hooks/useGetUsers';
import { BaseLayout } from '@/layout/BaseLayout';
import Image from 'next/image';
import { useContext, useState } from 'react';

export const Home = () => {
  const { users, totalCount, usersLoading } = useGetUsers();
  const { roles } = useContext(ApplicationContext);
  const [page, setPage] = useState<number>(1);

  return (
    <BaseLayout>
      <PrivateComponent<section> className='w-full flex flex-col items-center p-4 gap-5'>
        <h1 className='text-4xl'>Gestión de Usuarios</h1>

        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Creado en</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usersLoading && (
              <tr>
                <td colSpan={5}>
                  <div className='flex justify-center items-center'>
                    <Loading /> <span>Cargando...</span>
                  </div>
                </td>
              </tr>
            )}

            {users?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Image
                      src={user?.image ?? '/media/default-user.jpg'}
                      width={40}
                      height={40}
                      alt='User image'
                      className='rounded-full' />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.emailVerified?.toDateString()}</td>
                  <td>{roles.find((role) => role.id === user.roleId)?.name}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginator
          currentPage={page}
          itemsPerPage={20}
          totalCount={totalCount}
          updatePage={setPage} />
      </section>
    </BaseLayout>
  );
};
