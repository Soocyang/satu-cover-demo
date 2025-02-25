import { describe, it, expect } from 'vitest';
import { CONFIGS } from '@/lib/configs';

describe('CONFIGS', () => {
  describe('BASE_API_URL', () => {
    it('should be defined', () => {
      expect(CONFIGS.BASE_API_URL).toBeDefined();
    });

    it('should match the expected URL', () => {
      expect(CONFIGS.BASE_API_URL).toBe('https://reqres.in/api');
    });
  });

  describe('PER_PAGE_PER_FETCH_USERS', () => {
    it('should be defined', () => {
      expect(CONFIGS.PER_PAGE_PER_FETCH_USERS).toBeDefined();
    });

    it('should be a number', () => {
      expect(typeof CONFIGS.PER_PAGE_PER_FETCH_USERS).toBe('number');
    });

    it('should match the expected value', () => {
      expect(CONFIGS.PER_PAGE_PER_FETCH_USERS).toBe(5);
    });
  });

  describe('PUBLIC_ROUTES', () => {
    it('should be defined', () => {
      expect(CONFIGS.PUBLIC_ROUTES).toBeDefined();
    });

    it('should be an array', () => {
      expect(Array.isArray(CONFIGS.PUBLIC_ROUTES)).toBe(true);
    });

    it('should contain the expected routes', () => {
      expect(CONFIGS.PUBLIC_ROUTES).toContain('/login');
      expect(CONFIGS.PUBLIC_ROUTES).toContain('/unauthorized');
    });

    it('should contain only strings', () => {
      CONFIGS.PUBLIC_ROUTES.forEach((route) => {
        expect(typeof route).toBe('string');
      });
    });
  });
});
