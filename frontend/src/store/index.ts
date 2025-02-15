import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import suggestionReducer from './slices/suggestionSlice';
import categoryReducer from './slices/categorySlice';
import locationReducer from './slices/locationSlice';
import { AuthState, SuggestionState, CategoryState, LocationState } from '../types';

export interface RootState {
  auth: AuthState;
  suggestions: SuggestionState;
  categories: CategoryState;
  locations: LocationState;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    suggestions: suggestionReducer,
    categories: categoryReducer,
    locations: locationReducer,
  },
});

export type AppDispatch = typeof store.dispatch; 