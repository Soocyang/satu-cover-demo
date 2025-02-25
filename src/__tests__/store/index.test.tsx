import { RootState, store, useAppDispatch, useAppSelector } from '@/store';
import { handleToggleEmailMask } from '@/store/usersListSlice';
import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it } from 'vitest';

// Wrapper component for testing hooks
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('Redux Store', () => {
  it('should have the usersList reducer registered', () => {
    const state = store.getState();

    expect(state).toHaveProperty('usersList');
  });

  describe('Custom Hooks', () => {
    beforeEach(() => {
      store.dispatch(handleToggleEmailMask(null));
    });

    it('useAppSelector should select data from the store', () => {
      // Setup test state
      store.dispatch(handleToggleEmailMask(42));

      // Test selector hook
      const { result } = renderHook(
        () =>
          useAppSelector((state: RootState) => state.usersList.currentUserId),
        { wrapper },
      );

      // Verify selection works
      expect(result.current).toBe(42);
    });

    it('useAppDispatch should dispatch actions to the store', () => {
      // Render dispatch hook
      const { result } = renderHook(() => useAppDispatch(), { wrapper });

      // Use act to wrap the dispatch operation
      act(() => {
        result.current(handleToggleEmailMask(5));
      });

      // Verify state was updated via the dispatch
      const state = store.getState();
      expect(state.usersList.currentUserId).toBe(5);
    });
  });
});
