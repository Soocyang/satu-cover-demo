import { describe, it, expect } from 'vitest';
import { cn, maskEmail } from '@/lib/utils';

describe('cn function', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toBe('text-red-500 bg-blue-500');
  });

  it('should handle conditional class names', () => {
    const result = cn('text-base', true && 'p-4', false && 'hidden');
    expect(result).toBe('text-base p-4');
  });

  it('should handle complex Tailwind class merging scenarios', () => {
    const result = cn(
      'flex items-center p-2 rounded border border-gray-300',
      'sm:p-4 md:flex-row',
      'hover:bg-gray-100',
      'p-6', // Should override p-2
    );

    // p-6 should override p-2, rest should remain
    expect(result).toContain('p-6');
    expect(result).not.toContain('p-2');
    expect(result).toContain('flex');
    expect(result).toContain('items-center');
    expect(result).toContain('rounded');
    expect(result).toContain('border');
    expect(result).toContain('border-gray-300');
    expect(result).toContain('sm:p-4');
    expect(result).toContain('md:flex-row');
    expect(result).toContain('hover:bg-gray-100');
  });
});

describe('maskEmail function', () => {
  it('should mask the local part of a valid email address', () => {
    const result = maskEmail('john.doe@example.com');
    expect(result).toBe('********@example.com');
  });

  it('should handle empty strings', () => {
    const result = maskEmail('');
    expect(result).toBe('');
  });

  it('should handle emails with very short local parts', () => {
    const result = maskEmail('a@example.com');
    expect(result).toBe('*@example.com');
  });

  it('should handle emails with very long local parts', () => {
    const longLocal = 'verylongemailaddress.with.many.parts';
    const result = maskEmail(`${longLocal}@example.com`);
    expect(result).toBe('*'.repeat(longLocal.length) + '@example.com');
  });

  it('should return empty string for inputs without @ symbol', () => {
    const result = maskEmail('invalid-email');
    expect(result).toBe('');
  });

  it('should handle undefined inputs', () => {
    // @ts-expect-error Testing with undefined input
    const result = maskEmail(undefined);
    expect(result).toBe('');
  });

  it('should handle null inputs', () => {
    // @ts-expect-error Testing with null input
    const result = maskEmail(null);
    expect(result).toBe('');
  });

  it('should handle emails with empty local part', () => {
    const result = maskEmail('@example.com');
    expect(result).toBe('');
  });

  it('should handle emails with empty domain', () => {
    const result = maskEmail('user@');
    expect(result).toBe('');
  });
});
