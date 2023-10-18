'use client';

import { User } from '@/app/Interfaces';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface FriendState {
  friend: null | User;
}

const initialState: FriendState = {
  friend: null,
};

export const authSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriend: (state, action: PayloadAction<User | null>) => {
      state.friend = action.payload;
    },
  }
})

export const { setFriend } = authSlice.actions;

export default authSlice.reducer;