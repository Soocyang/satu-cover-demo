import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

vi.mock('@/components/layout/demo-flag', () => ({
  DemoRibbon: () => <div data-testid="demo-ribbon">Demo Ribbon</div>,
}));

vi.mock('@/providers/auth', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('renders the DemoRibbon component', () => {
    render(
      <RootLayout>
        <div>Child content</div>
      </RootLayout>,
    );

    const demoRibbon = screen.getByTestId('demo-ribbon');
    expect(demoRibbon).toBeInTheDocument();
  });

  it('renders the AuthProvider with children', () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Child content</div>
      </RootLayout>,
    );

    const authProvider = screen.getByTestId('auth-provider');
    expect(authProvider).toBeInTheDocument();

    const childContent = screen.getByTestId('child-content');
    expect(childContent).toBeInTheDocument();
    expect(childContent).toHaveTextContent('Child content');
  });

  it('renders within the body tag', () => {
    render(
      <RootLayout>
        <div>Child content</div>
      </RootLayout>,
    );

    const body = document.querySelector('body');
    expect(body).toContainElement(screen.getByTestId('demo-ribbon'));
    expect(body).toContainElement(screen.getByTestId('auth-provider'));
  });
});
