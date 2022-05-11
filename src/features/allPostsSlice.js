import { createSlice } from '@reduxjs/toolkit';

export const allPostsSlice = createSlice({
  name: 'postsJson',
  initialState: {
    postsJson: {}
  },
  reducers: {
    updatePostsJson: (state, action) => {
      // console.log("updatePostsJson", action.payload);
      state.postsJson = action.payload;
    }
  }
});

export const { updatePostsJson } = allPostsSlice.actions;
export const getPostsJson = (state) => state.postsJson.postsJson;

export default allPostsSlice.reducer;