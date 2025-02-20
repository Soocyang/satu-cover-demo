import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LogIn() {
  const session = await auth();
  const user = session?.user;

  if (user) return redirect('/');

  return (
    <div className="w-screen h-screen grid place-items-center">
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button
          type="submit"
          className="border border-primary hover:bg-secondary p-4 font-semibold rounded-md"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
}
