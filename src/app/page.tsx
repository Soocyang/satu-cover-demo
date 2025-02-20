import { signOut } from '@/auth';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="grid place-items-center h-screen w-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center">Hello World!</h1>

        <Image
          src="/assets/logo.png"
          width={160}
          height={160}
          alt="Logo of the app"
        />

        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button
            type="submit"
            className="border border-primary hover:bg-secondary p-4 font-semibold rounded-md"
          >
            Logout
          </button>
        </form>
      </div>
    </main>
  );
}
