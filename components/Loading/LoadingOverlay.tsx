import { FC } from 'react';
import { Loading } from '.';

export const LoadingOverlay: FC = () => (
  <div className='flex w-full items-center justify-center min-h-svh text-2xl gap-3'>
    <Loading size={2} />

    <span>Cargando...</span>
  </div>
);
