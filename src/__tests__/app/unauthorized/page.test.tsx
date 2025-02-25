import Unauthorized from '@/app/unauthorized/page';
import { render, screen } from '@testing-library/react';
import { ClassAttributes, ImgHTMLAttributes } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>,
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  ) => <img {...props} data-testid="next-image" />,
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  ),
}));

describe('Unauthorized Component', () => {
  it('renders the heading with correct text', () => {
    render(<Unauthorized />);

    const heading = screen.getByRole('heading', {
      name: /unauthorized access/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the unauthorized image with correct properties', () => {
    render(<Unauthorized />);

    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/unauthorized.png');
    expect(image).toHaveAttribute('alt', 'Car towing picture');
    expect(image).toHaveAttribute('width', '410');
    expect(image).toHaveAttribute('height', '223');
  });

  it('renders a button that links to the login page', () => {
    render(<Unauthorized />);

    const button = screen.getByText(/return login/i);
    expect(button).toBeInTheDocument();

    const link = screen.getByTestId('next-link');
    expect(link).toHaveAttribute('href', '/login');
  });
});
