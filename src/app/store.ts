import countriesReducer from '@features/countriesSlice';
import submissionsReducer from '@features/submissionsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    submissions: submissionsReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
