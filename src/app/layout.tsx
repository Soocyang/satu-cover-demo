import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/providers';

export const metadata: Metadata = {
  title: 'SatuCover | Demo',
  description: 'Customer portal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
