import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
}
