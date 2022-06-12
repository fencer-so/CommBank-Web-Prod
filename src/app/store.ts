import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import themeReducer from '../features/themeswitcher/themeSlice';
import goalsReducer from './goalsSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    modal: modalReducer,
    goals: goalsReducer,
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
