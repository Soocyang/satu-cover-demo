import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="grid place-items-center min-h-[calc(100vh-4rem-1.75rem-1px)] w-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center">Hello World!</h1>

        <Image
          src="/images/logo.png"
          width={160}
          height={160}
          alt="Logo of the app"
        />
      </div>
    </main>
  );
}
