import reducer, {
  UsersListState,
  handleToggleEmailMask,
  selectCurrentUserId,
} from '@/store/usersListSlice';
import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';

describe('usersListSlice', () => {
  it('should return the initial state', () => {
    const initialState = { currentUserId: null };
    const nextState = reducer(undefined, { type: 'unknown' });

    expect(nextState).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should handle setting currentUserId when it was null', () => {
      const initialState: UsersListState = { currentUserId: null };
      const action = handleToggleEmailMask(5);
      const nextState = reducer(initialState, action);

      expect(nextState.currentUserId).toBe(5);
    });

    it('should handle setting currentUserId to null when toggling the same ID', () => {
      const initialState: UsersListState = { currentUserId: 5 };
      const action = handleToggleEmailMask(5);
      const nextState = reducer(initialState, action);

      expect(nextState.currentUserId).toBe(null);
    });

    it('should handle changing currentUserId when toggling a different ID', () => {
      const initialState: UsersListState = { currentUserId: 5 };
      const action = handleToggleEmailMask(10);
      const nextState = reducer(initialState, action);

      expect(nextState.currentUserId).toBe(10);
    });
  });

  describe('selectors', () => {
    it('should select the currentUserId', () => {
      const store = configureStore({
        reducer: {
          usersList: reducer,
        },
      });

      store.dispatch(handleToggleEmailMask(7));

      const state = store.getState();
      const currentUserId = selectCurrentUserId(state);

      expect(currentUserId).toBe(7);
    });

    it('should select null when no user is selected', () => {
      const store = configureStore({
        reducer: {
          usersList: reducer,
        },
      });

      const state = store.getState();
      const currentUserId = selectCurrentUserId(state);

      expect(currentUserId).toBe(null);
    });
  });
});
