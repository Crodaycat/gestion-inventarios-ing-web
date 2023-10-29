import { FC } from 'react';
import { Loading } from '.';

export const LoadingOverlay: FC = () => (
  <div className='flex items-center justify-center min-h-svh text-2xl'>
    <Loading size={2} />

    <span>Cargando...</span>
  </div>
);
