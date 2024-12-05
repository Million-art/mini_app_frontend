import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TCoinShowSlice = {
    value:null | string
}

const initialState: TCoinShowSlice = {
    value: null
};

const coinShowSlice = createSlice({
  name: 'coinShow',
  initialState,
  reducers: {
    setCoinShow: (state, action: PayloadAction<string>) => {
      state.value = action.payload;// Assuming that if we have user data, the user is logged in
    },
  }
});

export const selectCoinShow = (state: RootState) => state.coinShow;
export const { setCoinShow} = coinShowSlice.actions;
export default coinShowSlice.reducer;
