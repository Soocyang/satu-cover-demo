import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="flex flex-col gap-10 items-center">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Unauthorized Access
        </h2>

        <Image
          src="/images/unauthorized.png"
          width={410}
          height={223}
          alt="Car towing picture"
        />

        <Button size={'lg'} className="font-semibold text-md" asChild>
          <Link href="/login">Return Login</Link>
        </Button>
      </div>
    </div>
  );
}
