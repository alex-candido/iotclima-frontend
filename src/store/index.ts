// src/store/index.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import ReduxStorage from 'redux-persist/lib/storage';

import usersSlice from './slices/users-slice';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage: ReduxStorage,
  // whitelist: [''], 
  // blacklist: [''],
};

const rootReducer = combineReducers({
  users: usersSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;