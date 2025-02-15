export interface User {
  id: string;
  username: string;
  email: string;
  favorites: string[];
  location?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  location: string;
  category: Category;
  author: {
    id: string;
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

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface SuggestionState {
  suggestions: Suggestion[];
  selectedSuggestion: Suggestion | null;
  isLoading: boolean;
  error: string | null;
}

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
} 