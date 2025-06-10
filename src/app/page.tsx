'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Bengali locale by default
    router.replace('/bn');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-islamic-primary">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}


