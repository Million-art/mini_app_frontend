import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TUserSlice = {
    value:null | string
}

const initialState: TUserSlice = {
    value: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
     setUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;// Assuming that if we have user data, the user is logged in
    },
  }
});

export const selectUser = (state: RootState) => state.user;
export const { setUser} = userSlice.actions;
export default userSlice.reducer;
