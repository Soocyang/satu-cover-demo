import StoreProvider from '@/providers/store';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock react-redux and store
vi.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="redux-provider">{children}</div>
  ),
}));

vi.mock('@/store', () => ({
  store: {},
}));

describe('StoreProvider', () => {
  it('renders children correctly', () => {
    const testChild = <div data-testid="test-child">Test Child</div>;

    render(<StoreProvider>{testChild}</StoreProvider>);

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('uses the Redux Provider with correct store', () => {
    render(
      <StoreProvider>
        <div>Child component</div>
      </StoreProvider>,
    );

    expect(screen.getByTestId('redux-provider')).toBeInTheDocument();
    expect(screen.getByText('Child component')).toBeInTheDocument();
  });
});
