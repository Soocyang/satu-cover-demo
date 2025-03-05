import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { User } from '@/types/user';
import { getUserById } from '@/app/(protected)/actions';

export type UsersListState = {
  unmaskedUser: User | null;
  isLoading: boolean;
  loadingUserId: number | null;
  error: string | null;
};

const initialState: UsersListState = {
  unmaskedUser: null,
  isLoading: false,
  loadingUserId: null,
  error: null,
};

export const fetchUserById = createAsyncThunk(
  'usersList/fetchUserById',
  async (userId: number) => {
    const { data } = await getUserById(userId);
    return data;
  },
);

export const usersListSlice = createSlice({
  name: 'users-list',
  initialState,
  reducers: {
    resetUnmaskedUser: (state) => {
      state.unmaskedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        state.loadingUserId = action.meta.arg;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loadingUserId = null;
        state.isLoading = false;
        state.unmaskedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loadingUserId = null;
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user';
      });
  },
});

export const { resetUnmaskedUser } = usersListSlice.actions;

export const selectUnmaskedUser = (state: RootState) =>
  state.usersList.unmaskedUser;

export const selectIsLoading = (state: RootState) => state.usersList.isLoading;
export const selectLoadingUserId = (state: RootState) =>
  state.usersList.loadingUserId;

export default usersListSlice.reducer;
