import { withPrivateRoute } from '@/HOC/PrivateRoute';

const Home = () => {
  return (
    <main className='h-svh w-full flex items-center justify-center'>
      Hola mundo
    </main>
  );
};

export default withPrivateRoute(Home);
