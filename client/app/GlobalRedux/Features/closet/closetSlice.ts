'use client';
import { Closet } from '@/app/Interfaces';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface ClosetState {
  closets: Closet[],
  selectedCloset: Closet | null;
}

const initialState: ClosetState = {
  closets: [],
  selectedCloset: null,
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
    setClosetState: (state, action) => {
      state.closets = action.payload;
    },
    setSelectedCloset: (state, action: PayloadAction<Closet | null>) => {
      state.selectedCloset = action.payload;
    },
  }
})

export const { addCloset, removeCloset, updateCloset, setClosetState, setSelectedCloset } = closetSlice.actions;

export default closetSlice.reducer;