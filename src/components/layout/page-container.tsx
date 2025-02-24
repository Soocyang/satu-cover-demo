import * as React from 'react';

export default function PageContainer({
  children,
}: React.ComponentProps<'main'>) {
  return (
    <main className="flex min-h-[calc(100vh-4rem-1.75rem-1px)] w-full py-12">
      <div className="mx-auto flex flex-col max-w-screen-md">{children}</div>
    </main>
  );
}
