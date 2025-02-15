export interface District {
  _id: string;
  name: string;
}

export interface City {
  _id: string;
  name: string;
  districts: District[];
}

export interface LocationState {
  cities: City[];
  selectedCity: City | null;
  selectedDistrict: District | null;
  isLoading: boolean;
  error: string | null;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  favorites: string[];
  location?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface Suggestion {
  _id: string;
  title: string;
  description: string;
  location: string;
  category: Category | string;
  author: {
    _id: string;
    username: string;
  };
  votes: {
    likes: string[];
    unlikes: string[];
  };
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: string;
  updatedAt: string;
}

export interface SuggestionState {
  suggestions: Suggestion[];
  selectedSuggestion: Suggestion | null;
  isLoading: boolean;
  error: string | null;
} 