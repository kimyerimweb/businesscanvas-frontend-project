import { configureStore } from '@reduxjs/toolkit';
import imageReducer from '@reducer/imageSlice';
import urlReducer from '@reducer/urlSlice';

export const store = configureStore({
  reducer: {
    images: imageReducer,
    urls: urlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
