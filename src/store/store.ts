import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/store/slice/userSlice'
import calculateSlice from '@/store/slice/calculateSlice'
import coinShowSlice from '@/store/slice/coinShowSlice'
import messageSlice from '@/store/slice/messageSlice'
import topUsersSlice from '@/store/slice/topUsersSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        calculate: calculateSlice,
        coinShow: coinShowSlice,
        message:messageSlice,
        topUsers:topUsersSlice,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
