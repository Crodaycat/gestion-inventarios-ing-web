import { withPrivateRoute } from '@/HOC/PrivateRoute';
import { BaseLayout } from '@/layout/BaseLayout';

const Home = () => {
  return (
    <BaseLayout>
      <p className='w-full flex items-center justify-center'>Hola mundo</p>
    </BaseLayout>
  );
};

export default withPrivateRoute(Home);
