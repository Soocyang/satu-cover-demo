import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import PageContainer from '@/components/layout/page-container';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <PageContainer>{children}</PageContainer>

      <Footer />
    </>
  );
}
