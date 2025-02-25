import PageContainer from '@/components/layout/page-container';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Page Container', () => {
  it('renders with children', () => {
    render(<PageContainer>Hello World</PageContainer>);

    const result = screen.getByText('Hello World');

    expect(result.textContent).toBe('Hello World');
  });
});
