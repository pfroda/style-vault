'use client';
import { Outfit } from '@/app/Interfaces';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface OutfitState {
  outfits: Outfit[];
  outfitUrl: string;
}

const initialState: OutfitState = {
  outfits: [],
  outfitUrl: '',
};

export const outfitSlice = createSlice({
  name: 'outfit',
  initialState,
  reducers: {
    addOutfit: (state, action: PayloadAction<Outfit>) => {
      state.outfits.push(action.payload);
    },
    removeOutfit: (state, action: PayloadAction<string>) => {
      state.outfits = state.outfits.filter(outfit => outfit.id !== action.payload);
    },
    updateOutfit: (state, action: PayloadAction<Outfit>) => {
      const index = state.outfits.findIndex(outfit => outfit.id === action.payload.id);
      if (index !== -1) {
        state.outfits[index] = action.payload;
      }
    },
    setOutfitUrl: (state, action: PayloadAction<string>) => {
      state.outfitUrl = action.payload;
    },
  }
})

export const { addOutfit, removeOutfit, updateOutfit, setOutfitUrl  } = outfitSlice.actions;

export default outfitSlice.reducer;