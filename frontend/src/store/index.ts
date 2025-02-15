import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import suggestionReducer from './slices/suggestionSlice';
import categoryReducer from './slices/categorySlice';
import { AuthState, SuggestionState, CategoryState } from '../types';

export interface RootState {
  auth: AuthState;
  suggestions: SuggestionState;
  categories: CategoryState;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    suggestions: suggestionReducer,
    categories: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch; 