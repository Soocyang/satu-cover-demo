import Loading from '@/app/(protected)/loading';
import { Skeleton } from '@/components/ui/skeleton';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/components/ui/skeleton', { spy: true });

describe('Loading Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders with correct numbers of Skeleton components', () => {
    const { container } = render(<Loading />);
    const wrapper = container.firstChild;

    expect(wrapper).toBeDefined();
    expect(Skeleton).toHaveBeenCalledTimes(7);
  });
});
