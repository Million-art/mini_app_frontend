import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TCalculateSlice = {
    value:null | string
}

const initialState: TCalculateSlice = {
    value: null
};

const calculateSlice = createSlice({
  name: 'calculate',
  initialState,
  reducers: {
    setCalculate: (state, action: PayloadAction<string>) => {
      state.value = action.payload;// Assuming that if we have user data, the user is logged in
    },
  }
});

export const selectCalculate = (state: RootState) => state.calculate;
export const { setCalculate} = calculateSlice.actions;
export default calculateSlice.reducer;
