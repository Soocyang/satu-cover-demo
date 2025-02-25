import { DemoRibbon, DemoTag } from '@/components/layout/demo-flag';
import { render, screen } from '@testing-library/react';
import * as navigation from 'next/navigation';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the next/navigation module
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    usePathname: vi.fn(),
  };
});

vi.mock('@/components/ui/badge', { spy: true });

describe('DemoRibbon', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render when pathname is in PUBLIC_ROUTES', () => {
    vi.mocked(navigation.usePathname).mockReturnValue('/login');

    render(<DemoRibbon />);

    const ribbonText = screen.getByText('Demo');
    expect(ribbonText).toBeTruthy();
  });

  it('should not render when pathname is not in PUBLIC_ROUTES', async () => {
    vi.mocked(navigation.usePathname).mockReturnValue('/dashboard');

    const { container } = render(<DemoRibbon />);

    expect(container.firstChild).toBeFalsy();
  });

  it('should update when pathname changes', () => {
    vi.mocked(navigation.usePathname).mockReturnValue('/');

    const { rerender, container } = render(<DemoRibbon />);
    expect(container.firstChild).toBeFalsy();

    // Update pathname to a public route and rerender
    vi.mocked(navigation.usePathname).mockReturnValue('/login');
    rerender(<DemoRibbon />);

    expect(screen.getByText('Demo')).toBeTruthy();
  });
});

describe('DemoTag', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render with text', () => {
    render(<DemoTag />);

    expect(screen.getAllByText('Demo')).toBeTruthy();
  });
});
