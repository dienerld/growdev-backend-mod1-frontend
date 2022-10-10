import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import { rootReducers } from './modules/rootReducer';

// local storage
const rootConfig = {
  key: 'dnr-growdev-modbackend',
  storage,
  whitelist: ['theme', 'user'],
  blacklist: [],
};

export const persistedReducer = persistReducer(rootConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

//
export const storePersisted = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
