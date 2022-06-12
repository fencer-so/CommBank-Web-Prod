import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import themeReducer from '../features/themeswitcher/themeSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
