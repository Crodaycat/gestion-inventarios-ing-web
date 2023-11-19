import { Button } from '@/components/Button';
import { ProtectedComponent } from '@/components/ProtectedComponent';
import { Enum_RoleName } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export const NavBar: FC = () => {
  const { data } = useSession();

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

      <div className='flex flex-col gap-5 items-center'>
        <Link href='/inventarios'>
          <Button size='extraLarge'>Inventarios</Button>
        </Link>

        <Link href='/materiales'>
          <Button size='extraLarge'>Materiales</Button>
        </Link>

        <ProtectedComponent allowedRoles={[Enum_RoleName.ADMIN]}>
          <Link href='/usuarios'>
            <Button size='extraLarge'>Usuarios</Button>
          </Link>
        </ProtectedComponent>
      </div>
    </div>
  );
};
