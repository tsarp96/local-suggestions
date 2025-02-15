import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LocationState, City, District } from '../../types';

const initialState: LocationState = {
  cities: [],
  selectedCity: null,
  selectedDistrict: null,
  isLoading: false,
  error: null,
};

export const fetchCities = createAsyncThunk(
  'locations/fetchCities',
  async () => {
    const response = await axios.get('http://localhost:5000/api/locations/cities');
    return response.data;
  }
);

export const fetchDistricts = createAsyncThunk(
  'locations/fetchDistricts',
  async (cityId: string) => {
    const response = await axios.get(`http://localhost:5000/api/locations/cities/${cityId}/districts`);
    return response.data;
  }
);

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
      state.selectedDistrict = null;
    },
    setSelectedDistrict: (state, action) => {
      state.selectedDistrict = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch cities';
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        if (state.selectedCity) {
          state.selectedCity.districts = action.payload;
        }
      });
  },
});

export const { setSelectedCity, setSelectedDistrict } = locationSlice.actions;
export default locationSlice.reducer; 