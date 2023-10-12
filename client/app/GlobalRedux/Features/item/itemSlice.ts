'use client';
import { Item } from '@/app/Interfaces';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface ItemState {
    items: Item[];
}

const initialState: ItemState = {
    items: [],
}

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Item>) => {
          state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateItem: (state, action: PayloadAction<Item>) => {
          const index = state.items.findIndex(item => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        },
      }
    })

export const { addItem, removeItem, updateItem }  = itemSlice.actions;

export default itemSlice.reducer;