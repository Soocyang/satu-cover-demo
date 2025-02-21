import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="grid place-items-center h-screen w-screen">
      <div>
        <h1 className="text-2xl font-bold text-center">Hello World!</h1>

        <Image
          src="/assets/logo.png"
          width={160}
          height={160}
          alt="Logo of the app"
        />
      </div>
    </main>
  );
}
