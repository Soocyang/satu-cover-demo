import Footer from '@/components/layout/footer';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.stubEnv('NEXT_PUBLIC_VERSION', 'testing');

describe('Footer', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render with text', () => {
    render(<Footer />);

    expect(
      screen.getAllByText('Copyright © 2025 SatuCover. All rights reserved.'),
    ).toBeTruthy();
  });

  it('should render with version by env variable', () => {
    render(<Footer />);

    expect(screen.getAllByText('Version: testing')).toBeTruthy();
  });
});
