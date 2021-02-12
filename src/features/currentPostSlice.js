import { createSlice } from '@reduxjs/toolkit';

export const currentSlice = createSlice({
  name: 'currentPost',
  initialState: {
    currentPost: null
  },
  reducers: {
    updateCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },

  }
});

export const { updateCurrentPost } = currentSlice.actions;
export const selectCurrentPost = (state) => state.currentPost.currentPost;

export default currentSlice.reducer;