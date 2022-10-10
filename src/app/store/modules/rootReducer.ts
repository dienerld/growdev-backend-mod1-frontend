import { combineReducers } from '@reduxjs/toolkit';
import { themeReducers } from './theme';
import { userReducer } from './user';

export const rootReducers = combineReducers({
  theme: themeReducers,
  user: userReducer,
});

export type typeReducers = ReturnType<typeof rootReducers>;
export type typeActions = typeof rootReducers;
