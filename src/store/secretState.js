import { createSlice } from '@reduxjs/toolkit';

export const secretSlice = createSlice({
  name: 'secretState',
  initialState: {
    secret: undefined
  },
  reducers: {
    updateSecret: (state, action) => {
      state.secret = action.payload;
    },

  }
});

export const { updateSecret } = secretSlice.actions;
export const selectSecret = (state) => state.secretState.secret;

export default secretSlice.reducer;