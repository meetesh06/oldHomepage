import { configureStore } from '@reduxjs/toolkit';

import postsJsonReducer from './allPostsSlice';
import currentSliceReducer from './currentPostSlice';
import sidebarState from './sidebarState';
import secretState from './secretState';
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => configureStore({
  reducer: {
    postsJson: postsJsonReducer,
    currentPost: currentSliceReducer,
    sidebarState: sidebarState,
    secretState: secretState
  }
})

export const wrapper = createWrapper(makeStore);
