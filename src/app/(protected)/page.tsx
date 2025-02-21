import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Hello World!</h1>

      <Image
        src="/images/logo.png"
        width={160}
        height={160}
        alt="Logo of the app"
      />
    </>
  );
}
