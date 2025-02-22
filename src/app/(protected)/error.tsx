'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error() {
  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col items-center gap-8">
        <p className="text-4xl font-bold">Opps... Something went wrong❗</p>

        <Button asChild size={'lg'} className="text-lg max-w-60">
          <Link href={'/'}>Back to Home Page</Link>
        </Button>
      </div>
    </div>
  );
}
