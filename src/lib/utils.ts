import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const maskEmail = (email: string): string => {
  if (!email) return '';

  const [localPart, domain] = email.split('@');

  if (!localPart || !domain) return '';

  const maskedLocal = '*'.repeat(localPart.length);
  return `${maskedLocal}@${domain}`;
};
