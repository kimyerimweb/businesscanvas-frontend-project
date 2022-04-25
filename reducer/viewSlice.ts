import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { viewState } from '@typings/view';
import { imageInfo } from '@typings/image';
import { urlInfo } from '@typings/url';

const initialState: viewState = {
  value: null,
  view: false,
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    replaceValue: (state, action: PayloadAction<imageInfo | urlInfo | null>) => {
      state.value = action.payload;
    },
    toggleView: (state, action: PayloadAction<boolean>) => {
      state.view = action.payload;
    },
  },
});

export const { replaceValue, toggleView } = viewSlice.actions;

export default viewSlice.reducer;
