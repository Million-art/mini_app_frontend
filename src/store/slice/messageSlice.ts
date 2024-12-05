import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TMessageSlice = {
    value:null | string
}

const initialState: TMessageSlice = {
    value: null
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setShowMessage: (state, action: PayloadAction<string>) => {
      state.value = action.payload;// Assuming that if we have user data, the user is logged in
    },
  }
});

export const selectShowMessage = (state: RootState) => state.message;
export const { setShowMessage} = messageSlice.actions;
export default messageSlice.reducer;
