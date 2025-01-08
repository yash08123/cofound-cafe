'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '../lib/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = checkAuth();
    console.log('Dashboard layout auth check:', user);
    
    if (!user) {
      console.log('No authenticated user, redirecting to sign in');
      router.push('/auth/sign-in');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-10">
        {children}
      </main>
    </div>
  );
}
