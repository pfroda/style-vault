'use client';

import { User } from '@/app/Interfaces';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface AuthState {
  user: null | User;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.isAuthenticated = !!action.payload;
      state.user = action.payload;
    },
  }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;