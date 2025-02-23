import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import PageContainer from '@/components/layout/page-container';
import StoreProvider from '@/providers/store';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <StoreProvider>
        <PageContainer>{children}</PageContainer>
      </StoreProvider>

      <Footer />
    </>
  );
}
