import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define the structure of the user object
export type TUser = {
  uid: string;  
   daily?: {
    claimedTime: Date | null; // `null` or a `Date` instance for last claim time
    claimedDay: number; // The current claim day
  };
  [key: string]: any; // For any additional dynamic fields
};

export type TUserSlice = {
  value: TUser | null; // User object or null if no user is logged in
};

// Initial state
const initialState: TUserSlice = {
  value: null,
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data
    setUser: (state, action: PayloadAction<TUser>) => {
      state.value = action.payload;
    },
    // Action to clear user data
    clearUser: (state) => {
      state.value = null;
    },
  },
});

// Selector to get the user from the Redux state
export const selectUser = (state: RootState): TUser | null => state.user.value;

// Export actions and reducer
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
