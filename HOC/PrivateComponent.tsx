import { Enum_RoleName } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { ComponentType, FC } from 'react';

export const withPrivateComponent = <Props extends object>(
  PrivateComponent: ComponentType<Props>,
  allowedRoles: Enum_RoleName[]
) => {
  const ProtectedComponent: FC<Props> = (props) => {
    const { status, data } = useSession();

    if (status === 'loading' || !allowedRoles.includes(data!.user.role!)) {
      return (
        <div className='w-full text-center text-red-600'>
          No tiene los permisos suficientes para acceder a esta funcionalidad.
        </div>
      );
    }

    return <PrivateComponent {...props} />;
  };

  return ProtectedComponent;
};
