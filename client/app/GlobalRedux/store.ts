'use client'
import { configureStore  } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';

import userReducer from './Features/user/authSlice';
import itemReducer from './Features/item/itemSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer
  },
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;