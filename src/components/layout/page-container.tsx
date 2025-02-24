import * as React from 'react';

export default function PageContainer({
  children,
}: React.ComponentProps<'main'>) {
  return (
    <main className="flex min-h-page-content w-full py-12">
      <div className="mx-auto flex flex-col max-w-screen-md">{children}</div>
    </main>
  );
}
