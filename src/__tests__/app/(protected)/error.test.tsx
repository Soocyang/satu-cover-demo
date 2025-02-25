import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Error from '@/app/(protected)/error';

// Mock the next/link component
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe('Error Component', () => {
  it('renders the error message', () => {
    render(<Error />);

    expect(
      screen.getByText('Opps... Something went wrong❗'),
    ).toBeInTheDocument();
  });

  it('renders a button linking to the home page', () => {
    render(<Error />);

    const homeLink = screen.getByRole('link', { name: /back to home page/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the button with correct text', () => {
    render(<Error />);

    expect(
      screen.getByRole('link', { name: /back to home page/i }),
    ).toBeInTheDocument();
  });
});
