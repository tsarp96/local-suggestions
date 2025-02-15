import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SuggestionState, Suggestion } from '../../types';

const initialState: SuggestionState = {
  suggestions: [],
  selectedSuggestion: null,
  isLoading: false,
  error: null,
};

export const fetchSuggestions = createAsyncThunk(
  'suggestions/fetchSuggestions',
  async ({ location, category }: { location?: string; category?: string }) => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (category) params.append('category', category);
    
    const response = await axios.get(`http://localhost:5000/api/suggestions?${params}`);
    return response.data;
  }
);

export const createSuggestion = createAsyncThunk(
  'suggestions/createSuggestion',
  async (suggestionData: Partial<Suggestion>, { getState }: any) => {
    const token = getState().auth.token;
    const response = await axios.post(
      'http://localhost:5000/api/suggestions',
      suggestionData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  }
);

export const voteSuggestion = createAsyncThunk(
  'suggestions/voteSuggestion',
  async ({ id, type }: { id: string; type: 'like' | 'unlike' }, { getState }: any) => {
    const token = getState().auth.token;
    const response = await axios.post(
      `http://localhost:5000/api/suggestions/${id}/vote`,
      { type },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  }
);

const suggestionSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setSelectedSuggestion: (state, action: PayloadAction<Suggestion | null>) => {
      state.selectedSuggestion = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch suggestions';
      })
      .addCase(createSuggestion.fulfilled, (state, action) => {
        state.suggestions.unshift(action.payload);
      })
      .addCase(voteSuggestion.fulfilled, (state, action) => {
        const index = state.suggestions.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.suggestions[index] = action.payload;
        }
        if (state.selectedSuggestion?.id === action.payload.id) {
          state.selectedSuggestion = action.payload;
        }
      });
  },
});

export const { setSelectedSuggestion, clearSuggestions } = suggestionSlice.actions;
export default suggestionSlice.reducer; 