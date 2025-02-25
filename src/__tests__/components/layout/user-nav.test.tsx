import UserNav from '@/components/layout/user-nav';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the auth module
vi.mock('@/auth', () => ({
  signOut: vi.fn(),
}));

describe('UserNav', () => {
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/avatar.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays user initial as fallback when no image is provided', () => {
    const userWithoutImage = { ...mockUser, image: null };
    render(<UserNav user={userWithoutImage} />);

    expect(screen.getByText('T')).toBeInTheDocument();
  });
});
