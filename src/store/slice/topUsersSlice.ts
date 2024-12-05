import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TTopUsersSlice = {
    value:null | string[]
}

const initialState: TTopUsersSlice = {
    value: []
};

const topUsersSlice = createSlice({
  name: 'topUsers',
  initialState,
  reducers: {
    setTopUsers: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;// Assuming that if we have user data, the user is logged in
    },
  }
});

export const selectTopUsers = (state: RootState) => state.topUsers;
export const {setTopUsers } = topUsersSlice.actions;
export default topUsersSlice.reducer;
