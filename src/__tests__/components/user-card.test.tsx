import UserCard from '@/components/user-card';
import { render, screen } from '@testing-library/react';
import { ClassAttributes, ImgHTMLAttributes, JSX } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: vi.fn(() => <div data-testid="skeleton-mock" />),
}));

vi.mock('next/image', () => ({
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>,
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  ) => <img {...props} />,
}));

describe('UserCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUser = {
    id: 1,
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'https://example.com/avatar.jpg',
    isEmailMasked: true,
    isLoading: false,
    onUnmaskEmail: vi.fn(),
  };

  it('renders user information correctly', () => {
    render(<UserCard {...mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();

    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('displays actual email when not masked', () => {
    const unmaskUser = { ...mockUser, isEmailMasked: false };
    render(<UserCard {...unmaskUser} />);

    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('displays email with skeleton when isLoading is true', () => {
    const unmaskUser = { ...mockUser, isEmailMasked: false, isLoading: true };
    render(<UserCard {...unmaskUser} />);

    expect(screen.getByTestId('skeleton-mock')).toBeInTheDocument();
  });
});
