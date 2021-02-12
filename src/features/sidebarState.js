import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebarState',
  initialState: {
    mobileVisible: false
  },
  reducers: {
    updateVisiblity: (state, action) => {
      state.mobileVisible = action.payload;
    },

  }
});

export const { updateVisiblity } = sidebarSlice.actions;
export const selectVisiblity = (state) => state.sidebarState.mobileVisible;

export default sidebarSlice.reducer;