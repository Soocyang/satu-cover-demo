import { auth } from '@/auth';
import { LoginForm } from '@/components/login-form';
import { redirect } from 'next/navigation';

export default async function LogIn() {
  const session = await auth();
  const isAuthenticated = session?.user;

  if (isAuthenticated) return redirect('/');

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
