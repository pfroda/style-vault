'use client';
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';


export const filterSlice = createSlice({
    name: 'filter',
    initialState: { 
      category: 'All',
      season: [],
      brand: [],
      occasion: [],
      location: '',
      color: [],
    },
    reducers: {
        setSelectedFilter: (state, action) => {
          if (action.payload.type === 'category') {
            state.category = action.payload.value;
          } else if (action.payload.type === 'season') {
            state.season = action.payload.value;
          } else if (action.payload.type === 'brand') {
            state.brand = action.payload.value;
          } else if (action.payload.type === 'occasion') {
            state.occasion = action.payload.value;
          } else if (action.payload.type === 'location') {
            state.location = action.payload.value;
          } else if (action.payload.type === 'color') {
            state.color = action.payload.value;
          }
        },
        resetFilters(state) {
          state.category = 'All',
          state.season = [],
          state.brand = [],
          state.occasion = [],
          state.location = '',
          state.color = []
        }
      }
    })

export const { setSelectedFilter, resetFilters }  = filterSlice.actions;
export default filterSlice.reducer;