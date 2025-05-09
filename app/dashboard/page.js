import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardContent from './DashboardContent';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    redirect('/auth/login');
  }

  return <DashboardContent />;
}