import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  loading: true,
  hasPurchased: false,
  hasExchange: false,
};

const premiumSlice = createSlice({
  name: 'premium',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setHasPurchased: (state, action: PayloadAction<boolean>) => {
      state.hasPurchased = action.payload;
    },
    setHasExchange: (state, action: PayloadAction<boolean>) => {
      state.hasExchange = action.payload;
    },
  },
});

// Selectors
export const selectPremiumState = (state: RootState) => state.premium;

// Export actions and reducer
export const { setLoading, setHasPurchased, setHasExchange } = premiumSlice.actions;
export default premiumSlice.reducer;
