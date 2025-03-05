import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from '@/app/api/users/[id]/route';
import { CONFIGS } from '@/lib/configs';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('GET User Route Handler', () => {
  const mockUserId = '12345';
  const mockUserData = {
    id: mockUserId,
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch user data and return it as JSON', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserData,
    });

    const response = await GET(new Request(`${CONFIGS.WEB_API_URL}/users`), {
      params: { id: mockUserId },
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${CONFIGS.BASE_API_URL}/users/${mockUserId}`,
    );

    expect(response).toBeInstanceOf(Response);

    const responseData = await response.json();
    expect(responseData).toEqual(mockUserData);
  });

  it('should throw an error when fetch fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      GET(new Request(`${CONFIGS.WEB_API_URL}/users/12345`), {
        params: { id: mockUserId },
      }),
    ).rejects.toThrow('Failed to fetch user data');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `${CONFIGS.BASE_API_URL}/users/${mockUserId}`,
    );
  });
});
