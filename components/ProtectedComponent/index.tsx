import { Enum_RoleName } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

export interface ProtectedComponentProps {
  children?: React.ReactNode;
  allowedRoles?: Enum_RoleName[];
  showMessage?: boolean;
}

export const ProtectedComponent: FC<ProtectedComponentProps> = ({
  children,
  allowedRoles = [],
  showMessage = false,
}) => {
  const { status, data } = useSession();

  if (status === 'loading' || !allowedRoles.includes(data!.user.role!)) {
    return showMessage ? (
      <div className='w-full text-center'>
        No tiene los permisos suficientes para acceder a esta funcionalidad.
      </div>
    ) : null;
  }

  return children;
};
