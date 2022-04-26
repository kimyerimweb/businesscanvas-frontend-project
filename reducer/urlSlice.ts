import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { urlState, urlInfo, editUrlProps } from '@typings/url';

const initialState: urlState = {
  value: [
    { url: 'https://www.robinwieruch.de/react-libraries/', time: 1 },
    { url: 'https://typed.blog/how-to-write-a-better-research-paper-faster/', time: 2 },
  ],
};

export const urlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<urlInfo>) => {
      state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<urlInfo>) => {
      state.value = state.value.filter((el) => el.time !== action.payload.time);
    },
    edit: (state, action: PayloadAction<editUrlProps>) => {
      const idx = state.value.indexOf(action.payload.urlInfo);
      const newValue = { time: action.payload.urlInfo.time, url: action.payload.newUrl };
      state.value.splice(idx, 1, newValue);
    },
  },
});

export const { add, remove, edit } = urlSlice.actions;

export default urlSlice.reducer;
