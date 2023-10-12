'use client';

import { Item } from '@/app/Interfaces';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface ItemState {
    item: null | Item;
}

const initialState: ItemState = {
    item: null
}

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItem: (state, action: PayloadAction<Item | null>) => {
            state.item = action.payload;
        }
    }
})

export const { setItem }  = itemSlice.actions;

export default itemSlice.reducer;