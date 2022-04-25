import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { imageInfo, imageState } from '@typings/image';

const initialState: imageState = {
  value: [],
};

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<imageInfo>) => {
      state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<imageInfo>) => {
      state.value = state.value.filter((el) => el.time !== action.payload.time);
    },
  },
});

export const { add, remove } = imageSlice.actions;

export default imageSlice.reducer;
