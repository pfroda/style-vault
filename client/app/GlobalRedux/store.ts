'use client'
import { configureStore  } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';

import userReducer from './Features/user/authSlice';
import closetReducer from './Features/closet/closetSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    closet: closetReducer
  },
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;