import { Button } from '@/components/Button';
import { signIn } from 'next-auth/react';
import { FC } from 'react';

export const Login: FC = () => {
  return (
    <main className='flex flex-col gap-10 items-center justify-center w-full'>
      <h1 className='text-4xl'>Sistema de gestión de inventarios</h1>

      <Button color='secondary' onClick={() => signIn('auth0')}>
        Iniciar Sesión
      </Button>
    </main>
  );
};
