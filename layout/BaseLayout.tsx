import { NavBar } from '@/components/NavBar';
import { FC } from 'react';

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className='base-layout'>
      <aside className='base-layout__aside'>
        <NavBar />
      </aside>

      <main className='base-layout__main'>{children}</main>
    </div>
  );
};
