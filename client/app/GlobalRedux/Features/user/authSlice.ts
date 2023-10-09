'use client';

import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface AuthState {
  user: null;
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
    setUser: (state, action: PayloadAction<null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;