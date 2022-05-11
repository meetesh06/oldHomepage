import { configureStore } from '@reduxjs/toolkit';

import postsJsonReducer from './features/allPostsSlice';
import currentSliceReducer from './features/currentPostSlice';
import sidebarState from './features/sidebarState';
import secretState from './features/secretState';

export default configureStore({
  reducer: {
    postsJson: postsJsonReducer,
    currentPost: currentSliceReducer,
    sidebarState: sidebarState,
    secretState: secretState
  }
})