
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    const token = isClient && localStorage.getItem('token');

    if (token) {
      router.push('/userHome');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
