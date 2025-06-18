// src/app/(admin)/admin/dashboard/page.tsx

'use client'; 
import api from '@/lib/api';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users/'); 
        setData(response.data);
        console.log('API Test: Success', response.data);
      } catch (err: unknown) {
        console.error('API Test: Error', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    console.log(data)
  }, []);

  if (loading) {
    return <div>Loading API test data...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>API Test Failed!</h1>
        <p>Error: {error}</p>
        <p>
          Possible reasons:
          <br />1. Django backend not running.
          <br />2. Backend URL (NEXT_PUBLIC_API_BASE_URL) is incorrect.
          <br />3. Network/Firewall blocking access.
          <br />4. API endpoint requires authentication (and we are not sending token yet).
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Dashboard Page</h1>
      <p>API Test Succeeded (or returned data)! Check console for full response.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p>This is a temporary test. Remove this useEffect after confirming API communication.</p>
    </div>
  );
}