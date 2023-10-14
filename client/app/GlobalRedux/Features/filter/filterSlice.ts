'use client';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';


export const filterSlice = createSlice({
    name: 'filter',
    initialState: { 
      category: 'All',
      season: undefined
    },
    reducers: {
        setSelectedFilter: (state, action) => {
          if (action.payload.type === 'category') {
            state.category = action.payload.value;
          } else if (action.payload.type === 'season') {
            state.season = action.payload.value;
          }
        },
      }
    })

export const { setSelectedFilter }  = filterSlice.actions;
export default filterSlice.reducer;