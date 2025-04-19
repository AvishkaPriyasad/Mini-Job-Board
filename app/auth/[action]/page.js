import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthForm from './AuthForm';

export default async function AuthPage({ params }) {
  // Await both cookies and params
  const [cookieStore, awaitedParams] = await Promise.all([
    cookies(),
    params
  ]);

  const token = cookieStore.get('token')?.value;
  
  if (token) {
    redirect('/dashboard');
  }

  return <AuthForm action={awaitedParams.action} />;
}