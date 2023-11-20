import { withPrivateRoute } from '@/HOC/PrivateRoute';
import { Loading } from '@/components/Loading';
import { BaseLayout } from '@/layout/BaseLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/inventarios');
  }, [router]);

  return (
    <BaseLayout>
      <p className='w-full h-full flex items-center justify-center'>
        <Loading size={2} />
      </p>
    </BaseLayout>
  );
};

export default withPrivateRoute(Home);
