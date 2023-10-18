'use client'
import { configureStore  } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';

import userReducer from './Features/user/authSlice';
import itemReducer from './Features/item/itemSlice';
import closetReducer from './Features/closet/closetSlice';
import outfitReducer from './Features/outfit/outfitSlice';
import filterReducer from './Features/filter/filterSlice';
import friendReducer from './Features/friend/friendSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
    closet: closetReducer,
    outfit: outfitReducer,
    filter: filterReducer,
    friend: friendReducer
  },
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;