// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { queryFeed } from '../../../services/apiGraphQL';

// import { User, Item } from '@/app/Interfaces';

// interface ActivityFeed {
//   message: string;
//   timestamp: string;
//   user: User;
//   item?: Item;
// }

// interface FeedState extends Array<ActivityFeed> {}

// export const fetchFeed = createAsyncThunk<ActivityFeed[], string>(
//   'feed/fetchFeed',
//   async (userId) => {
//     const response = await queryFeed(userId);
//     return response.data.getFeed;
//   }
// );

// const feedSlice = createSlice({
//   name: 'feed',
//   initialState: [] as FeedState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchFeed.fulfilled, (state, action: PayloadAction<ActivityFeed[]>) => {
//       return action.payload;
//     });
//   },
// });

// export default feedSlice.reducer;