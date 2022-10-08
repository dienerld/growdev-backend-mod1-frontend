import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import { rootReducers } from './modules/rootReducer';

const config = {
  key: 'restaurant_key_12345',
  storage,
  whitelist: ['theme'],
  blacklist: [],
};

export const persistedReducer = persistReducer(config, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const storePersisted = persistStore(store);
export type AppDispatch = typeof store.dispatch;
