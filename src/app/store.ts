import selectionReducer from '@/utils/selectionSlice';
import { rickAndMortyAPI } from '@api/rickAndMorty';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
    [rickAndMortyAPI.reducerPath]: rickAndMortyAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
