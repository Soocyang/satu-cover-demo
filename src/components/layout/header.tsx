import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import UserNav from './user-nav';

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center overflow-y-hidden px-8">
        <Button asChild variant={'ghost'} className="font-sans text-lg px-2">
          <Link href={'/'}>
            <Image
              src="/images/logo.png"
              alt="logo-image"
              width="35"
              height="35"
            />

            <span>SatuCover</span>
          </Link>
        </Button>

        <div className="ml-auto flex items-center space-x-4">
          {session?.user && <UserNav user={session.user} />}
        </div>
      </div>
    </header>
  );
}
