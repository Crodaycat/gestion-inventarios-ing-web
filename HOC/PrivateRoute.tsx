import { LoadingOverlay } from '@/components/Loading/LoadingOverlay';
import { Login } from '@/components/Login';
import { useSession } from 'next-auth/react';
import { ComponentType, FC } from 'react';

export const withPrivateRoute = <Props extends object>(
  PrivateComponent: ComponentType<Props>
) => {
  const ProtectedComponent: FC<Props> = (props) => {
    const { data, status } = useSession();

    console.log('data', data);

    if (status === 'loading') {
      return <LoadingOverlay />;
    }

    if (status === 'unauthenticated') {
      return <Login />;
    }

    return <PrivateComponent {...props} />;
  };

  return ProtectedComponent;
};
