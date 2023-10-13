'use client';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';


export const filterSlice = createSlice({
    name: 'filter',
    initialState: { category: 'All' },
    reducers: {
        setSelectedFilter: (state, action) => {
        state.category = action.payload
        // return action.payload;
          },
      }
    })

export const { setSelectedFilter }  = filterSlice.actions;
export default filterSlice.reducer;