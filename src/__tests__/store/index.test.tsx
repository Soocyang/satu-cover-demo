import { store } from '@/store';
import usersListReducer, { UsersListState } from '@/store/usersListSlice';
import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Redux Store', () => {
  let testStore: ReturnType<
    typeof configureStore<{
      usersList: UsersListState;
    }>
  >;

  beforeEach(() => {
    // Create a fresh test store for each test
    vi.resetAllMocks();

    testStore = configureStore({
      reducer: {
        usersList: usersListReducer,
      },
    });
  });

  it('should create a store with the correct reducers', () => {
    // Verify that the store has the expected structure
    expect(store.getState()).toHaveProperty('usersList');
  });

  it('should use the usersListReducer for the usersList slice', () => {
    // Initial state should match in both stores
    expect(store.getState().usersList).toEqual(testStore.getState().usersList);
    expect(store.getState().usersList).toEqual({
      unmaskedUser: null,
      isLoading: false,
      loadingUserId: null,
      error: null,
    });
  });
});
