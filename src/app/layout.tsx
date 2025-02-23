import { DemoRibbon } from '@/components/layout/demo-flag';
import AuthProvider from '@/providers/auth';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SatuCover | Demo',
  description: 'SatuCover Customer portal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DemoRibbon />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
