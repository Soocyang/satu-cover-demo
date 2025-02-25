import {
  getAllUsersData,
  getUsersData,
  transformUsersList,
} from '@/app/(protected)/actions';
import { CONFIGS } from '@/lib/configs';
import { User } from '@/types/user';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Create a proper typed mock for fetch
vi.stubGlobal('fetch', vi.fn());
// Explicitly type the mocked function to access Vitest's mock methods
const mockedFetch = fetch as unknown as ReturnType<typeof vi.fn>;

describe('User Actions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getUsersData', () => {
    it('should fetch users with the correct URL and params', async () => {
      const mockResponse: Partial<Response> = {
        ok: true,
        json: () =>
          Promise.resolve({
            data: [{ id: 1, first_name: 'John', last_name: 'Doe' }],
            page: 1,
            total_pages: 2,
          }),
      };

      mockedFetch.mockResolvedValue(mockResponse as Response);

      await getUsersData({ page: 1, per_page: 10 });

      expect(mockedFetch).toHaveBeenCalledWith(
        `${CONFIGS.BASE_API_URL}/users?page=1&per_page=10`,
      );
    });

    it('should throw an error if the response is not ok', async () => {
      const mockResponse: Partial<Response> = {
        ok: false,
      };

      mockedFetch.mockResolvedValue(mockResponse as Response);

      await expect(getUsersData()).rejects.toThrow('Failed to fetch user data');
    });

    it('should return the response JSON when successful', async () => {
      const mockData = {
        data: [{ id: 1, first_name: 'John', last_name: 'Doe' }],
        page: 1,
        total_pages: 2,
      };

      const mockResponse: Partial<Response> = {
        ok: true,
        json: () => Promise.resolve(mockData),
      };

      mockedFetch.mockResolvedValue(mockResponse as Response);

      const result = await getUsersData();

      expect(result).toEqual(mockData);
    });
  });

  describe('getAllUsersData', () => {
    it('should fetch all pages of user data and combine them', async () => {
      const mockFirstPage = {
        data: [
          { id: 1, first_name: 'George', last_name: 'Smith' },
          { id: 2, first_name: 'Alice', last_name: 'Williams' },
        ],
        page: 1,
        total_pages: 3,
      };

      const mockSecondPage = {
        data: [
          { id: 3, first_name: 'Bob', last_name: 'Wilson' },
          { id: 4, first_name: 'Greg', last_name: 'Johnson' },
        ],
        page: 2,
        total_pages: 3,
      };

      const mockThirdPage = {
        data: [
          { id: 5, first_name: 'Charlie', last_name: 'Washington' },
          { id: 6, first_name: 'Diana', last_name: 'Brown' },
        ],
        page: 3,
        total_pages: 3,
      };

      // Set up fetch to return different responses
      mockedFetch.mockImplementation((url: string | URL | Request) => {
        const urlString = url.toString();
        if (urlString.includes('page=1')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockFirstPage),
          } as Response);
        } else if (urlString.includes('page=2')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockSecondPage),
          } as Response);
        } else {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockThirdPage),
          } as Response);
        }
      });

      const result = await getAllUsersData();

      expect(mockedFetch).toHaveBeenCalledTimes(3);
      expect(mockedFetch).toHaveBeenCalledWith(
        `${CONFIGS.BASE_API_URL}/users?page=1&per_page=${CONFIGS.PER_PAGE_PER_FETCH_USERS}`,
      );
      expect(mockedFetch).toHaveBeenCalledWith(
        `${CONFIGS.BASE_API_URL}/users?page=2&per_page=${CONFIGS.PER_PAGE_PER_FETCH_USERS}`,
      );
      expect(mockedFetch).toHaveBeenCalledWith(
        `${CONFIGS.BASE_API_URL}/users?page=3&per_page=${CONFIGS.PER_PAGE_PER_FETCH_USERS}`,
      );

      expect(result).toEqual([
        { id: 1, first_name: 'George', last_name: 'Smith' },
        { id: 2, first_name: 'Alice', last_name: 'Williams' },
        { id: 3, first_name: 'Bob', last_name: 'Wilson' },
        { id: 4, first_name: 'Greg', last_name: 'Johnson' },
        { id: 5, first_name: 'Charlie', last_name: 'Washington' },
      ]);
    });
  });

  describe('transformUsersList', () => {
    it('should filter users with first name starting with G or last name starting with W', () => {
      const users: User[] = [
        {
          id: 1,
          first_name: 'George',
          last_name: 'Smith',
          email: 'george@example.com',
          avatar: '',
        },
        {
          id: 2,
          first_name: 'Alice',
          last_name: 'Williams',
          email: 'alice@example.com',
          avatar: '',
        },
        {
          id: 3,
          first_name: 'Bob',
          last_name: 'Wilson',
          email: 'bob@example.com',
          avatar: '',
        },
        {
          id: 4,
          first_name: 'Greg',
          last_name: 'Johnson',
          email: 'greg@example.com',
          avatar: '',
        },
        {
          id: 5,
          first_name: 'Charlie',
          last_name: 'Washington',
          email: 'charlie@example.com',
          avatar: '',
        },
        {
          id: 6,
          first_name: 'Diana',
          last_name: 'Brown',
          email: 'diana@example.com',
          avatar: '',
        },
      ];

      const result = transformUsersList(users);

      expect(result).toHaveLength(5);
      expect(result).toEqual(
        expect.arrayContaining([
          users[0], // George Smith
          users[1], // Alice Williams
          users[2], // Bob Wilson
          users[3], // Greg Johnson
          users[4], // Charlie Washington
        ]),
      );
      expect(result).not.toContainEqual(users[5]); // Diana Brown
    });

    it('should return empty array when no users match the criteria', () => {
      const users: User[] = [
        {
          id: 1,
          first_name: 'Alice',
          last_name: 'Smith',
          email: 'alice@example.com',
          avatar: '',
        },
        {
          id: 2,
          first_name: 'Bob',
          last_name: 'Jones',
          email: 'bob@example.com',
          avatar: '',
        },
      ];

      const result = transformUsersList(users);

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });
});
