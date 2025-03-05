import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import usersListReducer, {
  fetchUserById,
  resetUnmaskedUser,
  selectUnmaskedUser,
  selectIsLoading,
  selectLoadingUserId,
  UsersListState,
} from '@/store/usersListSlice';

// Mock the fetch API
global.fetch = vi.fn();

describe('UsersListSlice', () => {
  let testStore: ReturnType<
    typeof configureStore<{
      usersList: UsersListState;
    }>
  >;

  beforeEach(() => {
    vi.resetAllMocks();

    testStore = configureStore({
      reducer: {
        usersList: usersListReducer,
      },
    });
  });

  describe('Reducers', () => {
    it('should handle resetUnmaskedUser', () => {
      testStore = configureStore({
        reducer: { usersList: usersListReducer },
        preloadedState: {
          usersList: {
            unmaskedUser: {
              id: 1,
              email: 'test@example.com',
              first_name: 'Test',
              last_name: 'User',
              avatar: 'test.jpg',
            },
            isLoading: false,
            loadingUserId: null,
            error: null,
          },
        },
      });

      testStore.dispatch(resetUnmaskedUser());

      expect(testStore.getState().usersList.unmaskedUser).toBeNull();
    });

    it('should set loading state when fetchUserById is pending', async () => {
      global.fetch = vi.fn().mockImplementation(() => new Promise(() => {}));

      const promise = testStore.dispatch(fetchUserById(1));

      expect(testStore.getState().usersList.isLoading).toBe(true);
      expect(testStore.getState().usersList.loadingUserId).toBe(1);

      // Clean up
      promise.abort();
    });

    it('should update state when fetchUserById is fulfilled', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        avatar: 'test.jpg',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: mockUser }),
      });

      await testStore.dispatch(fetchUserById(1));

      expect(testStore.getState().usersList.isLoading).toBe(false);
      expect(testStore.getState().usersList.unmaskedUser).toEqual(mockUser);
      expect(testStore.getState().usersList.error).toBeNull();
    });

    it('should handle errors when fetchUserById is rejected', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      await testStore.dispatch(fetchUserById(999));

      expect(testStore.getState().usersList.isLoading).toBe(false);
      expect(testStore.getState().usersList.error).toBe(
        'Failed to fetch user data',
      );
    });
  });

  describe('Selectors', () => {
    beforeEach(() => {
      // Create store with test data
      testStore = configureStore({
        reducer: { usersList: usersListReducer },
        preloadedState: {
          usersList: {
            unmaskedUser: {
              id: 1,
              email: 'test@example.com',
              first_name: 'Test',
              last_name: 'User',
              avatar: 'test.jpg',
            },
            isLoading: true,
            loadingUserId: 2,
            error: null,
          },
        },
      });
    });

    it('should select state correctly with selectors', () => {
      // Test all selectors
      expect(selectUnmaskedUser(testStore.getState())).toEqual({
        id: 1,
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        avatar: 'test.jpg',
      });
      expect(selectIsLoading(testStore.getState())).toBe(true);
      expect(selectLoadingUserId(testStore.getState())).toBe(2);
    });
  });
});
