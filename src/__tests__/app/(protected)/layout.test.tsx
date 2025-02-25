import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProtectedLayout from '@/app/(protected)/layout';

vi.mock('@/components/layout/header', () => ({
  default: () => <div data-testid="header-mock">Header Component</div>,
}));

vi.mock('@/components/layout/footer', () => ({
  default: () => <div data-testid="footer-mock">Footer Component</div>,
}));

vi.mock('@/components/layout/page-container', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-container-mock">{children}</div>
  ),
}));

vi.mock('@/providers/store', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="store-provider-mock">{children}</div>
  ),
}));

describe('ProtectedLayout', () => {
  it('renders Header and Footer components', () => {
    render(<ProtectedLayout>Test Content</ProtectedLayout>);

    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });

  it('renders children inside PageContainer and StoreProvider', () => {
    render(<ProtectedLayout>Test Content</ProtectedLayout>);

    const pageContainer = screen.getByTestId('page-container-mock');
    const storeProvider = screen.getByTestId('store-provider-mock');

    expect(pageContainer).toBeInTheDocument();
    expect(storeProvider).toBeInTheDocument();
    expect(pageContainer.textContent).toBe('Test Content');
    expect(storeProvider.textContent).toBe('Test Content');
  });

  it('renders the complete component structure correctly', () => {
    render(<ProtectedLayout>Test Content</ProtectedLayout>);

    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByTestId('store-provider-mock')).toContainElement(
      screen.getByTestId('page-container-mock'),
    );
    expect(screen.getByTestId('page-container-mock')).toHaveTextContent(
      'Test Content',
    );
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });
});
