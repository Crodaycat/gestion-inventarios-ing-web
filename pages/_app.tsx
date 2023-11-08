import { ApplicationContextProvider } from '@/context/ApplicationContext';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ApplicationContextProvider>
        <Component {...pageProps} />
      </ApplicationContextProvider>
    </SessionProvider>
  );
};

export default App;
