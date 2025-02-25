import AuthProvider from '@/providers/auth';
import { render, screen } from '@testing-library/react';
import { Session } from 'next-auth';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}));

describe('AuthProvider', () => {
  it('renders children correctly', () => {
    const testChild = <div data-testid="test-child">Test Child</div>;

    render(<AuthProvider>{testChild}</AuthProvider>);

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('passes session prop to SessionProvider', () => {
    const mockSession: Session = {
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
      user: { name: 'Test User', email: 'test@example.com' },
    };

    render(
      <AuthProvider session={mockSession}>
        <div>Child component</div>
      </AuthProvider>,
    );

    expect(screen.getByTestId('session-provider')).toBeInTheDocument();
    expect(screen.getByText('Child component')).toBeInTheDocument();
  });
});
