import { Button } from '@/components/Button';
import { ProtectedComponent } from '@/components/ProtectedComponent';
import { Enum_RoleName } from '@prisma/client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const NavBar: FC = () => {
  const { data } = useSession();
  const router = useRouter();

  return (
    <div className='w-full h-full px-6 py-8 flex flex-col items-center'>
      <Image
        src={data?.user?.image || ''}
        alt='Imagen de perfil'
        width={128}
        height={128}
        className='w-48 rounded-full'
      />

      <span className='text-2xl font-bold text-white'>
        {data?.user?.name || ''}
      </span>

      <hr className='w-full my-4 text-slate-400' />

      <div className='flex flex-col gap-5 items-center w-full'>
        <Link
          href='/inventarios'
          className={router.asPath === '/inventarios' ? 'underline' : ''}
        >
          <Button size='extraLarge'>Inventarios</Button>
        </Link>

        <Link
          href='/materiales'
          className={router.asPath === '/materiales' ? 'underline' : ''}
        >
          <Button size='extraLarge'>Materiales</Button>
        </Link>

        <ProtectedComponent allowedRoles={[Enum_RoleName.ADMIN]}>
          <Link
            href='/usuarios'
            className={router.asPath === '/usuarios' ? 'underline' : ''}
          >
            <Button size='extraLarge'>Usuarios</Button>
          </Link>
        </ProtectedComponent>

        <hr className='w-full my-4 text-slate-400' />

        <Button size='extraLarge' onClick={signOut}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};
