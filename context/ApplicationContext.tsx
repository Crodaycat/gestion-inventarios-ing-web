import { useGetRoles } from '@/hooks/useGetRoles';
import { Role } from '@prisma/client';
import { FC, createContext } from 'react';

export interface IApplicationContext {
  roles: Role[];
  isLoadingRoles: boolean;
}

export const ApplicationContext = createContext<IApplicationContext>({
  roles: [],
  isLoadingRoles: false,
});

export interface ApplicationContextProviderProps {
  children?: React.ReactNode;
}

export const ApplicationContextProvider: FC<
  ApplicationContextProviderProps
> = ({ children }) => {
  const { roles, rolesLoading } = useGetRoles();

  return (
    <ApplicationContext.Provider
      value={{ roles, isLoadingRoles: rolesLoading }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
