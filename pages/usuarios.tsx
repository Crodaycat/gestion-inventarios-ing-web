import { withPrivateRoute } from '@/HOC/PrivateRoute';
import { Button } from '@/components/Button';
import { EditUser } from '@/components/EditUser';
import { Loading } from '@/components/Loading';
import { Paginator } from '@/components/Pagination';
import { ProtectedComponent } from '@/components/ProtectedComponent';
import { ApplicationContext } from '@/context/ApplicationContext';
import { useGetUsers } from '@/hooks/useGetUsers';
import { BaseLayout } from '@/layout/BaseLayout';
import { API_ROUTES } from '@/service/apiConfig';
import { Enum_RoleName, User } from '@prisma/client';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { mutate } from 'swr';

const itemsPerPage = 20;

const Home = () => {
  const { roles } = useContext(ApplicationContext);
  const [page, setPage] = useState<number>(1);
  const { users, totalCount, usersLoading } = useGetUsers(page, itemsPerPage);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUserOpen, setEditUserOpen] = useState<boolean>(false);

  const onCreated = async () => {
    const queryParams = new URLSearchParams({
      page: page?.toString(),
      itemPerPage: itemsPerPage?.toString(),
    });

    await mutate(`${API_ROUTES.users}?${queryParams}`);
  };

  return (
    <BaseLayout>
      <ProtectedComponent allowedRoles={[Enum_RoleName.ADMIN]} showMessage>
        <section className='w-full flex flex-col items-center p-4 gap-5'>
          <h1 className='text-4xl'>Gestión de Usuarios</h1>

          <table cellSpacing='0'>
            <thead>
              <tr>
                <th className='text-center'>Imagen</th>
                <th>ID</th>
                <th>Creado en</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usersLoading && (
                <tr>
                  <td colSpan={6}>
                    <div className='flex justify-center items-center'>
                      <Loading /> <span>Cargando...</span>
                    </div>
                  </td>
                </tr>
              )}

              {users?.map((user) => {
                return (
                  <tr key={user.id}>
                    <td className='flex justify-center'>
                      <Image
                        src={user?.image ?? '/media/default-user.jpg'}
                        width={40}
                        height={40}
                        alt='User image'
                        className='rounded-full'
                      />
                    </td>
                    <td>{user.id}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>{user.email}</td>
                    <td>
                      {roles.find((role) => role.id === user.roleId)?.name}
                    </td>
                    <td>
                      <Button
                        color='primary'
                        onClick={() => {
                          setSelectedUser(user);
                          setEditUserOpen(true);
                        }}
                      >
                        Editar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Paginator
            currentPage={page}
            itemsPerPage={itemsPerPage}
            totalCount={totalCount}
            updatePage={setPage}
          />
        </section>

        <EditUser
          user={selectedUser}
          isOpen={editUserOpen}
          onClose={() => setEditUserOpen(false)}
          onUpdated={onCreated}
        />
      </ProtectedComponent>
    </BaseLayout>
  );
};

export default withPrivateRoute(Home);
