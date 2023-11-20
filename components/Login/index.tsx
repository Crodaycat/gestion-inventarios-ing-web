import { Button } from '@/components/Button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const Login: FC = () => {
  const router = useRouter();

  return (
    <main className='flex flex-col gap-10 items-center justify-center w-full'>
      <h1 className='text-4xl'>Sistema de gestión de inventarios</h1>

      {router.asPath !== '/' && (
        <span className='text-red-500'>
          Debe iniciar sesión para acceder a este módulo.
        </span>
      )}

      <Button color='secondary' onClick={() => signIn('auth0')}>
        Iniciar Sesión
      </Button>
    </main>
  );
};
