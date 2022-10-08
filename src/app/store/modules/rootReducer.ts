import { combineReducers } from '@reduxjs/toolkit';
import { themeReducers } from './theme';

export const rootReducers = combineReducers({
  theme: themeReducers,
});

export type typeReducers = ReturnType<typeof rootReducers>;
