import { describe, it, expect } from 'vitest';
import { convertObjectToURLParams } from '@/lib/helpers';

describe('convertObjectToURLParams', () => {
  it('should return an empty string for an empty object', () => {
    const result = convertObjectToURLParams({});
    expect(result).toBe('');
  });

  it('should convert a simple object with string values', () => {
    const obj = {
      name: 'John',
      surname: 'Doe',
    };
    const result = convertObjectToURLParams(obj);
    expect(result).toBe('name=John&surname=Doe');
  });

  it('should convert an object with number values', () => {
    const obj = {
      age: 30,
      height: 175.5,
    };
    const result = convertObjectToURLParams(obj);
    expect(result).toBe('age=30&height=175.5');
  });

  it('should handle null and undefined values by excluding them', () => {
    const obj = {
      name: 'John',
      age: null,
      location: undefined,
    };
    const result = convertObjectToURLParams(obj);
    expect(result).toBe('name=John');
  });

  it('should convert array values by creating multiple entries with the same key', () => {
    const obj = {
      tags: ['javascript', 'typescript', 'react'],
    };
    const result = convertObjectToURLParams(obj);
    expect(result).toBe('tags=javascript&tags=typescript&tags=react');
  });

  it('should filter out falsy values from arrays', () => {
    const obj = {
      tags: ['javascript', '', null, 'react', undefined, false, 0],
    };
    const result = convertObjectToURLParams(obj);
    expect(result).toBe('tags=javascript&tags=react');
  });

  it('should handle mixed types in an object', () => {
    const obj = {
      name: 'John',
      age: 30,
      isActive: true,
      hobbies: ['reading', 'coding'],
      address: null,
    };
    const result = convertObjectToURLParams(obj);
    expect(result).toBe(
      'name=John&age=30&isActive=true&hobbies=reading&hobbies=coding',
    );
  });

  it('should handle empty arrays', () => {
    const obj = {
      tags: [],
    };
    const result = convertObjectToURLParams(obj);
    expect(result).toBe('');
  });

  it('should handle complex nested objects by converting them to strings', () => {
    const obj = {
      user: { name: 'John', age: 30 },
    };
    const result = convertObjectToURLParams(obj);
    expect(result).toBe('user=%5Bobject+Object%5D');
  });
});
