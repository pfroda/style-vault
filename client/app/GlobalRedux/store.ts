'use client'
import { configureStore  } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';

import userReducer from './Features/user/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;