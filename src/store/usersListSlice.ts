import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export type UsersListState = {
  currentUserId: number | null;
};

const initialState: UsersListState = {
  currentUserId: null,
};

export const usersListSlice = createSlice({
  name: 'users-list',
  initialState,
  reducers: {
    handleToggleEmailMask: (
      state,
      action: PayloadAction<UsersListState['currentUserId']>,
    ) => {
      state.currentUserId =
        action.payload === state.currentUserId ? null : action.payload;
    },
  },
});

export const { handleToggleEmailMask } = usersListSlice.actions;

export const selectCurrentUserId = (state: RootState) =>
  state.usersList.currentUserId;

export default usersListSlice.reducer;
