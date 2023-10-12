'use client';
import { Closet } from '@/app/Interfaces';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface ClosetState {
  closets: Closet[]
}

const initialState: ClosetState = {
  closets: [],
};

export const closetSlice = createSlice({
  name: 'closet',
  initialState,
  reducers: {
    addCloset: (state, action: PayloadAction<Closet>) => {
      state.closets.push(action.payload);
    },
    removeCloset: (state, action: PayloadAction<string>) => {
      state.closets = state.closets.filter(closet => closet.id !== action.payload);
    },
    updateCloset: (state, action: PayloadAction<Closet>) => {
      const index = state.closets.findIndex(closet => closet.id === action.payload.id);
      if (index !== -1) {
        state.closets[index] = action.payload;
      }
    },
  }
})

export const { addCloset, removeCloset, updateCloset } = closetSlice.actions;

export default closetSlice.reducer;