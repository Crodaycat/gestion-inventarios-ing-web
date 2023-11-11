import { ApplicationContextProvider } from '@/context/ApplicationContext';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ApplicationContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ApplicationContextProvider>
    </SessionProvider>
  );
};

export default App;
